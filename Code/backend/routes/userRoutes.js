// src/routes/userRoutes.js
import express from "express";
import User from "../models/userModel.js";
import { checkLoggedIn, checkSPSORole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to get all users, accessible only by SPSO role
router.get("/all", checkLoggedIn, checkSPSORole, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Route to update user role, accessible only by SPSO role
router.put("/:id", checkLoggedIn, checkSPSORole, async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Find the user by ID and update their role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user role" });
  }
});

export default router;
