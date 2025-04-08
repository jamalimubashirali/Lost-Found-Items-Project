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
};
