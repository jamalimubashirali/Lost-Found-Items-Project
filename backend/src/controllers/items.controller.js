import { Item } from "../models/Items.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createItem = asyncHandler(async (req, res) => {
  const { itemName, description, category, location, lostDate, itemType } = req.body;

  // Validate required fields
  if (!itemName || !description || !category || !location || !lostDate || !itemType) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }

  let imageUrl = null;

  // Handle file upload if exists
  if (req.files && req.files.itemImage && req.files.itemImage[0]) {
    try {
      const uploadedFile = await uploadOnCloudinary(req.files.itemImage[0].path);
      if (!uploadedFile?.url) {
        console.error('Cloudinary upload failed:', uploadedFile);
        return res.status(500).json({
          message: "Failed to upload image to Cloudinary"
        });
      }
      imageUrl = uploadedFile.url;
    } catch (error) {
      console.error('File upload error:', error);
      return res.status(500).json({
        message: "Image upload failed",
        error: error.message
      });
    }
  }

  try {
    // Create the item
    const item = await Item.create({
      itemName,
      itemType, // Use the itemType from request body
      description,
      category,
      location,
      lostDate,
      userId: req.user._id,
      images: imageUrl ? [imageUrl] : [] // Store as array for consistency
    });

    // Populate user details in the response
    const populatedItem = await Item.findById(item._id).populate("userId", "name email usename createdAt");

    return res.status(201).json({
      success: true,
      item: populatedItem
    });
  } catch (error) {
    console.error('Item creation error:', error);
    return res.status(500).json({
      message: "Failed to create item",
      error: error.message
    });
  }
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

  const updatedItem = await Item.findByIdAndUpdate({ _id: id }, updatedItemData, {
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
  const {
    query,
    itemName,
    description,
    category,
    location,
    itemType,
    dateRange,
    page = 1,
    limit = 10
  } = req.query;

  // Build search conditions
  const conditions = [];

  // General search across multiple fields
  if (query) {
    conditions.push(
      { itemName: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } }
    );
  }

  // Specific field searches
  if (itemName) conditions.push({ itemName: { $regex: itemName, $options: "i" } });
  if (description) conditions.push({ description: { $regex: description, $options: "i" } });
  if (category) conditions.push({ category: { $regex: category, $options: "i" } });
  if (location) conditions.push({ location: { $regex: location, $options: "i" } });
  if (itemType) conditions.push({ itemType });

  // Date range filtering
  if (dateRange) {
    const days = parseInt(dateRange);
    if (!isNaN(days)) {
      const dateFilter = new Date();
      dateFilter.setDate(dateFilter.getDate() - days);
      conditions.push({ createdAt: { $gte: dateFilter } });
    }
  }

  // Build final query
  const searchQuery = conditions.length > 0 ? { $or: conditions } : {};

  try {
    // Get total count for pagination
    const total = await Item.countDocuments(searchQuery);

    // Execute search with pagination
    const items = await Item.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'name avatar'); // Include user info

    return res.status(200).json({
      success: true,
      count: items.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      items
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Error performing search"
    });
  }
});

const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id).populate("userId", "name email usename createdAt");

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

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  return res.status(200).json({
    items,
  });
});

const getUserItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const items = await Item.find({ userId });
  if (!items) {
    return res.status(404).json({
      message: "No items found for this user",
    });
  }
  return res.status(200).json({
    items,
  });
});

export {
  createItem,
  getAllLostItems,
  getItemById,
  updateItemStatus,
  getAllFoundItems,
  updateItemDetails,
  deleteItem,
  searchItems,
  getAllItems,
  getUserItems
};
