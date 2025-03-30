import mongoose, { Schema } from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    lostItemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    foundItemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Match = mongoose.model("Match", matchSchema);
