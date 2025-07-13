const express = require("express");
const router = express.Router();
const Response = require("../models/ResponseModel");

// Submit a response
router.post("/", async (req, res) => {
  try {
    const response = await Response.create(req.body);
    res.status(201).json({ message: "Response submitted", data: response });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET all responses for a specific requestId
router.get("/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;

    const responses = await Response.find({ requestId })
      .populate("responderId", "name email");

    res.json({ message: "Responses fetched", data: responses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
