import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "SPSO"],
    required: true,
  },
  pageBalance: { type: Number, default: 0 },
  pageUsed: { type: Number, default: 0 }, // New attribute
});

export default mongoose.model("User", userSchema);
