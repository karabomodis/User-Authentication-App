const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const User = require("../Models/user");

console.log("TEMP PROFILE ROUTE FILE LOADED");

// ✅ TEST ROUTE (for debugging)
router.get("/test", (req, res) => {
  res.send("PROFILE ROUTE WORKING");
});

// Protected route
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Use the field your JWT middleware sets
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile loaded", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;