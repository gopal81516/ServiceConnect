const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed'],
    default: 'open'
  }
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
