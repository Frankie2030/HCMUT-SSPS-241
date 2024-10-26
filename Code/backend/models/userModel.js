import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "SPSO"],
    required: true,
  },
  pageBalance: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
