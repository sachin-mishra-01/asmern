// models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model("Note", NoteSchema);
