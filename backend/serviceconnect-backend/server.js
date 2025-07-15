const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas using Mongoose!"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Register routes
app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/responses", require("./routes/responseRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
