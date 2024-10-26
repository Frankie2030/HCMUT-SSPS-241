import express from "express";
import {
  createPrinter,
  getPrinters,
  getPrinter,
  updatePrinter,
  deletePrinter,
  setStatus
} from "../controllers/printerController.js";

const router = express.Router();

router.route("/").get(getPrinters).post(createPrinter);
router.route("/status").post(setStatus);
router
  .route("/:id")
  .get(getPrinter)
  .put(updatePrinter)
  .delete(deletePrinter);

export default router;
