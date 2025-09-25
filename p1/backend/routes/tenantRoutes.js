// routes/tenantRoutes.js
const express = require("express");
const router = express.Router();

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");
const { upgradeTenant } = require("../controllers/tenantController");

// Upgrade endpoint - requires auth + admin
router.post("/:slug/upgrade", authMiddleware, adminOnly, upgradeTenant);

module.exports = router;
