const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../Models/user.js");


// Signup route
router.post("/signup", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
