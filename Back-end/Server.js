const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authMiddleware = require("./Middleware/authMiddleware");

const app = express();



// Middleware
app.use(cors());
app.use(express.json());
const authRoutes = require("./Routes/auth");
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {

  res.json({
    message: "This is protected data",
    user: req.user
  });

});



// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
