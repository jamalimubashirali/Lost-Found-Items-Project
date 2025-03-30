import Match from '../models/match.model.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asynchandler.js';
import { Item } from '../models/Items.model';

const createMatches = asyncHandler(async (req, res) => {
    const lostItem = await Item.findById(req.params.lostItemId);
    if (!lostItem) return res.status(404).json({ message: "Lost item not found" });

    // Fetch potential matches
    const potentialMatches = await Item.find({
        type: "found",
        category: lostItem.category,
        location: { $regex: lostItem.location, $options: "i" },
        description: { $regex: lostItem.description, $options: "i" },
    });

    // Get existing matches
    const existingMatches = await Match.find({ lostItemId: lostItem._id });
    const matchedFoundIds = existingMatches.map(m => m.foundItemId.toString());

    // Filter new matches
    const newMatches = potentialMatches
        .filter(foundItem => !matchedFoundIds.includes(foundItem._id.toString()))
        .map(foundItem => ({
            lostItemId: lostItem._id,
            foundItemId: foundItem._id,
            status: "pending",
        }));

    if (newMatches.length > 0) {
        await Match.insertMany(newMatches);
    }

    res.status(201).json({ message: `Matches Created for the Item` });
});


const getMatches = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const matches = await Match.find({ lostItemId: id }).populate("foundItemId");
    res.status(200).json({ matches });
});