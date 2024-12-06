import express from "express";
import { checkLoggedIn } from "../middlewares/authMiddleware.js";
import {
  createBuyingLog,
  getBuyingLogsByUser,
} from "../controllers/buyingLogController.js";

const router = express.Router();

router.post("/", checkLoggedIn, createBuyingLog);
router.get("/mine", checkLoggedIn, getBuyingLogsByUser);

export default router;
