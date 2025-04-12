import { Match } from "../models/Matches.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asynchandler.js";
import { Item } from "../models/Items.model.js";

const createMatches = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  // Build match criteria
  const matchCriteria = {
    itemType: item.itemType === "lost" ? "found" : "lost",
    category: item.category,
    status: "Pending", // Only match with pending items
  };

  // Add location matching if exists (more flexible)
  if (item.location && item.location.trim() !== "") {
    const locationParts = item.location
      .split(/[,\s]+/)
      .filter((part) => part.length > 2);
    matchCriteria.$or = locationParts.map((part) => ({
      location: { $regex: part, $options: "i" },
    }));
  }

  // Add description keywords if exists
  if (item.description && item.description.trim() !== "") {
    const descKeywords = item.description
      .split(/\s+/)
      .filter((word) => word.length > 3);
    matchCriteria.$or = [
      ...(matchCriteria.$or || []),
      ...descKeywords.map((word) => ({
        description: { $regex: word, $options: "i" },
      })),
    ];
  }

  // Find potential matches
  const potentialMatches = await Item.find(matchCriteria);

  // Get existing matches
  const existingMatches = await Match.find({
    [item.itemType === "lost" ? "lostItemId" : "foundItemId"]: item._id,
  });

  const matchedIds = existingMatches.map((m) =>
    item.itemType === "lost"
      ? m.foundItemId.toString()
      : m.lostItemId.toString()
  );

  // Filter new matches
  const newMatches = potentialMatches
    .filter(
      (potentialItem) => !matchedIds.includes(potentialItem._id.toString())
    )
    .map((potentialItem) => ({
      [item.itemType === "lost" ? "lostItemId" : "foundItemId"]: item._id,
      [item.itemType === "lost" ? "foundItemId" : "lostItemId"]:
        potentialItem._id,
      status: "Pending",
    }));

  if (newMatches.length === 0) {
    return res.status(200).json({ message: "No new matches found" });
  }

  await Match.insertMany(newMatches);
  res.status(201).json({
    message: `New matches created`,
    matches: newMatches.length,
  });
});

const getMatches = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  // First determine if the item is lost or found
  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const isLostItem = item.itemType === "lost";

  const matches = await Match.aggregate([
    {
      $match: {
        [isLostItem ? "lostItemId" : "foundItemId"]:
          new mongoose.Types.ObjectId(itemId),
      },
    },
    {
      $lookup: {
        from: "items",
        localField: isLostItem ? "foundItemId" : "lostItemId",
        foreignField: "_id",
        as: "matchedItem",
      },
    },
    {
      $unwind: "$matchedItem",
    },
    {
      $lookup: {
        from: "users",
        localField: "matchedItem.userId",
        foreignField: "_id",
        as: "matchedItemUser",
      },
    },
    {
      $unwind: "$matchedItemUser",
    },
    {
      $project: {
        foundItemId: "$matchedItem._id",
        itemName: "$matchedItem.itemName",
        description: "$matchedItem.description",
        category: "$matchedItem.category",
        location: "$matchedItem.location",
        images: "$matchedItem.images",
        status: "$status",
        matchedAt: "$createdAt",
        user: {
          _id: "$matchedItemUser._id",
          name: "$matchedItemUser.name",
          username: "$matchedItemUser.username",
        },
        matchType: isLostItem ? "found" : "lost",
        matchId: "$_id",
      },
    },
    {
      $sort: { matchedAt: -1 }, // Sort by most recent matches first
    },
  ]);

  if (matches.length === 0) {
    return res.status(200).json({
      message: "No matches found for this item",
    });
  }

  res.status(200).json({
    success: true,
    itemType: item.itemType,
    matches,
  });
});

const updateMatchStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Please provide status",
    });
  }

  const updatedMatch = await Match.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    }
  );

  if (!updatedMatch) {
    return res.status(404).json({
      message: "Match not found",
    });
  }

  res.status(200).json({
    updatedMatch,
  });
});

export { createMatches, getMatches, updateMatchStatus };
