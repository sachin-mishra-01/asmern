// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const seedIfNeeded = require("./utils/seed");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
//app.use(cors()); // allow all origins for automated tests
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tenants", tenantRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(async (mongoose) => {
    // seed DB if needed
    await seedIfNeeded();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
