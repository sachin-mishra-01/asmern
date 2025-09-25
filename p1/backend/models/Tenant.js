// models/Tenant.js
const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  plan: { type: String, enum: ["free", "pro"], default: "free" },
  createdAt: { type: Date, default: Date.now },
  upgradedAt: { type: Date }
});

module.exports = mongoose.model("Tenant", TenantSchema);
