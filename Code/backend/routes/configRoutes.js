import express from "express";
import {
  getTypes,
  addType,
  deleteType,
  getDefaults,
  updateDefaults,
} from "../controllers/configController.js";

const router = express.Router();

router.route("/type").get(getTypes).post(addType).delete(deleteType);
router.route("/defaults").get(getDefaults).put(updateDefaults);
export default router;
