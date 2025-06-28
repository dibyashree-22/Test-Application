const Note = require("../models/Note");

exports.addNote = async (req, res) => {
  const { roomId, title, content } = req.body;

  try {
    const note = await Note.create({ roomId, title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to add note", error: error.message });
  }
};

exports.getNotesByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const notes = await Note.find({ roomId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notes", error: error.message });
  }
};
