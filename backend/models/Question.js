const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  questionText: String,
  options: [String],
  correctOption: Number
});

module.exports = mongoose.model("Question", questionSchema);
