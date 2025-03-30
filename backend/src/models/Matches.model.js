import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

matchSchema.plugin(mongooseAggregatePaginate);
export const Match = mongoose.model("Match", matchSchema);
