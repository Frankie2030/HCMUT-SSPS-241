import express from "express";
import {
  createFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
  storeFile,
  getStoredFile,
  getFilesByUser
} from "../controllers/fileController.js";
import multer from 'multer';
import { checkLoggedIn } from "../middlewares/authMiddleware.js";

const upload = multer({ dest: 'backend/controllers/uploads/' });

const router = express.Router();

router.route("/").get(getFiles).post(createFile);
router.route("/mine").get(checkLoggedIn, getFilesByUser);
router.route("/store").post(upload.single('file'), storeFile);
router.route("/store/:id").get(getStoredFile);
router.route("/:id").get(getFile).put(updateFile).delete(deleteFile);

export default router;
