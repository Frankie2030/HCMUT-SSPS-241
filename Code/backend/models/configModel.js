import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({
  defaultPages: { type: Number, default: 0 },
  distributionDates: Date,
  permittedFileType: {
    type: "array",
    items: {
      type: "string",
      enum: ["pdf", "jpg", "docx", "xls", "svg", "xlsx", "pptx", "png", "xps"],
    },
    default: []
  },
});

export default mongoose.model("Configuration", configurationSchema);
