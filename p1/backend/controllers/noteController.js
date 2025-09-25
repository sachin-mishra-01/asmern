// controllers/noteController.js
const Note = require("../models/Note");

// Get all notes for the logged-in tenant
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ tenantId: req.user.tenantId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// Create new note
const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;   // ✅ extract title from request

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const note = await Note.create({
      tenantId: req.user.tenantId,
      userId: req.user.id,
      title,      // ✅ include title here
      content,
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};


// Update a note
const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      { content: req.body.body },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// Delete a note
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
