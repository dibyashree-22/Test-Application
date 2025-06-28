const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  title: String,
  content: String
});

module.exports = mongoose.model("Note", noteSchema);
