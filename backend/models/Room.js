const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  section: String,
  code: { type: String, unique: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Room", roomSchema);
