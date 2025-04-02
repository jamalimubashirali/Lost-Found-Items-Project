import { Item } from "../models/Items.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createItem = asyncHandler(async (req, res) => {
  const { itemName, description, category, location, images, lostDate } =
    req.body;

  if (!itemName || !description || !category || !location || !lostDate) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  // Upload images to cloudinary
  if (req.files) {x
    try {
      images = await Promise.all(
        req.files.map(async (file) => {
          const uploadedFilePath = await uploadOnCloudinary(file);
          if (!uploadedFilePath) {
            throw new Error("Something went wrong while uploading images");
          }
          return uploadedFilePath?.url;
        })
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  const item = await Item.create({
    itemName,
    itemType: images.length > 0 ? "found" : "lost",
    description,
    category,
    location,
    lostDate,
    images,
    user: req.user._id,
  });

  return res.status(201).json({
    item,
  });
});

const getAllLostItems = asyncHandler(async (_, res) => {
  const items = await Item.find({ itemType: "lost" });
  return res.status(200).json({
    items,
  });
});

const getAllFoundItems = asyncHandler(async (_, res) => {
  const items = await Item.find({ itemType: "found" });
  return res.status(200).json({
    items,
  });
});

const updateItemDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedItemData = req.body;

  if (!updatedItem) {
    return res.status(400).json({
      message: "Please provide updated item details",
    });
  }

  const updatedItem = await Item.findByIdAndUpdate({ _id : id }, updatedItemData, {
    new: true,
  });

  if (!updatedItem) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  return res.status(200).json({
    updatedItem,
  });
});

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id);

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  return res.status(200).json({
    message: "Item deleted successfully",
  });
});

const searchItems = asyncHandler(async (req, res) => {
  const { itemName, description, category, location } = req.query;

  // Search for items based on itemName, description, category, location
  const items = await Item.find({
    $or: [
      { itemName: { $regex: itemName ? itemName : "", $options: "i" } },
      {
        description: { $regex: description ? description : "", $options: "i" },
      },
      { category: { $regex: category ? category : "", $options: "i" } },
      { location: { $regex: location ? location : "", $options: "i" } },
    ],
  });

  return res.status(200).json({
    items,
  });
});

const getLostItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  return res.status(200).json({
    item,
  });
});

const updateItemStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Please provide status",
    });
  }

  const item = await Item.findById(id);

  if (!item) {
    return res.status(404).json({
      message: "Item not found",
    });
  }

  item.status = status;
  await item.save();

  return res.status(200).json({
    item,
  });
});

export {
  createItem,
  getAllLostItems,
  getLostItem,
  updateItemStatus,
  getAllFoundItems,
  updateItemDetails,
  deleteItem,
  searchItems,
};
