import mongoose from "mongoose";

const printerSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    number: { type: String, required: true },
    description: String,
    location: {
      campus: String,
      building: String,
      room: String,
    },
    queue: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      required: true,
      default: "disabled",
    },
    restricted: {
      type: Boolean,
      default: false, // Default to false for regular printers
    },
  },
  { timestamps: { createdAt: "addedDate" } }
);

export default mongoose.model("Printer", printerSchema);
