import mongoose, { Schema } from "mongoose";

const lostItemSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    itemType: {
      type: String,
      enum: ["lost", "found"],
      default: "lost",
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    lostDate: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Matched", "Resolved"],
      default: "Pending",
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", lostItemSchema);
