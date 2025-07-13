const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Login successful", role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
