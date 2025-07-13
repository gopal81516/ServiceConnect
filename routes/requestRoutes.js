const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequestModel");

// Create a new service request
router.post("/", async (req, res) => {
  try {
    const request = await ServiceRequest.create(req.body);
    res.status(201).json({ message: "Request created", data: request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all service requests with optional filters
router.get("/", async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const requests = await ServiceRequest.find(filter).populate("userId", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update status of a service request
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!['open', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Service request not found" });
    }

    res.json({ message: "Status updated", data: updatedRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Route to get requests for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ userId: req.params.userId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
