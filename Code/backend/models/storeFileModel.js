import mongoose from "mongoose";

const storeFileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "File",
  },
});

export default mongoose.model("StoredFile", storeFileSchema);
