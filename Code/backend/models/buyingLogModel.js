import mongoose from "mongoose";

const buyingLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number, required: true },
    combo: { type: String, default: null }, // e.g., "Combo 100 A4"
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("BuyingLog", buyingLogSchema);
