const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
