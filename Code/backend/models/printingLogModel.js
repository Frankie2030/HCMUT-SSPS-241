import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
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
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    printingProperties: {
      pagesToBePrinted: {
        type: String,
        default: "all"
      },
      pagesToBePrintedCustom: {
        type: String,
        default: ""
      },
      pageLayout: {
        type: String,
        enum: ["portrait", "landscape"],
        default: "portrait"
      },
      paperSize: {
        type: String,
        default: "a4"
      },
      pagePerSide: {
        type: Number,
        default: 1
      },
      doubleSided:{
        type: String,
        enum: ["double", "one"],
        default: "double"
      },
      margin: {
        type: String,
        default: "default"
      },
      marginCustomTop: {
        type: Number,
        default: 0
      },
      marginCustomBottom: {
        type: Number,
        default: 0
      },
      marginCustomLeft: {
        type: Number,
        default: 0
      },
      marginCustomRight: {
        type: Number,
        default: 0
      },
      numberOfCopies: {
        type: Number,
        default: 1
      },
    },
    status: {
      type: String,
      enum: ["queued", "completed", "cancelled"],
      default: "queued",
    },
    schedule: {
      type: Date,
    }
  },
  { timestamps: { createdAt: "startTime", updatedAt: "endTime" } }
);

export default mongoose.model("Log", logSchema);
