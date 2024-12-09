import express from "express";
import {
  createFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
  storeFile,
  getStoredFile,
  getFilesByUser,
} from "../controllers/fileController.js";
import multer from "multer";
import { checkLoggedIn } from "../middlewares/authMiddleware.js";
import File from "../models/fileModel.js"; // Adjust the path based on your project structure

const upload = multer({ dest: "backend/controllers/uploads/" });

const router = express.Router();

router.route("/").get(getFiles).post(createFile);
router.route("/mine").get(checkLoggedIn, getFilesByUser);
// router.route("/store").post(upload.single('file'), storeFile);

// Update the route to accept multiple files
router.post("/store", upload.array("files", 10), storeFile);
router.route("/store/:id").get(getStoredFile);

router.route("/:id").get(getFile).put(updateFile).delete(deleteFile);

// Update printer for a specific file
router.put("/update-printer/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const { newPrinterId } = req.body;

  console.log("Received File ID:", fileId);
  console.log("Received New Printer ID:", newPrinterId);

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    file.printerId = newPrinterId;
    await file.save();

    res.status(200).json({ message: "Printer updated successfully", file });
  } catch (error) {
    console.error("Error updating printer:", error);
    res.status(500).json({ message: "Error updating printer", error });
  }
});

export default router;
