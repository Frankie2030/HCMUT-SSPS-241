import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  printerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Printer",
  },
  pageNum: {
    type: Number,
  },
  name: { type: String, required: true },
  type: { type: String, required: true },
  uploadTime: { type: Date, default: Date.now },
  status: { type: String, enum: ["verified", "notVerified"], default: "verified" },
});

export default mongoose.model("File", fileSchema);
