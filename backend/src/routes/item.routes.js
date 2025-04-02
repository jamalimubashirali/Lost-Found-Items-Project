import express from "express";
import {
  createItem,
  getAllLostItems,
  getAllFoundItems,
  updateItemDetails,
  deleteItem,
  searchItems,
  getLostItem,
  updateItemStatus,
} from "../controllers/items.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const itemRouter = express.Router();

itemRouter.post("/create", authMiddleware, createItem);
itemRouter.get("/lost", authMiddleware, getAllLostItems);
itemRouter.get("/found", authMiddleware, getAllFoundItems);
itemRouter.get("/search", authMiddleware, searchItems);
itemRouter.get("/lost-item/:id", authMiddleware, getLostItem);
itemRouter.patch("/update-status/:id", authMiddleware, updateItemStatus);
itemRouter.patch("/update-details/:id", authMiddleware, updateItemDetails);
itemRouter.delete("/delete-item/:id", authMiddleware, deleteItem);

export { itemRouter };
