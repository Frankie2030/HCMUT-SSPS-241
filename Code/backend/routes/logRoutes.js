import express from "express";
import {
  createPrintingLog,
  getPrintingLogs,
  getPrintingLog,
  cancelPrintingLog,
  deletePrintingLog,
  getPrintingLogsByUser
} from "../controllers/logController.js";

const router = express.Router();

router.route("/").get(getPrintingLogs).post(createPrintingLog);
router.route("/mine").get(getPrintingLogsByUser);
router
  .route("/:id")
  .get(getPrintingLog)
  .put(cancelPrintingLog)
  .delete(deletePrintingLog);

export default router;
