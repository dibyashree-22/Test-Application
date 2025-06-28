const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        selectedOption: { type: Number, required: true, min: 1, max: 4 } // Assuming 4 options for MCQs
      }
    ],
    score: { type: Number, required: true }
  },
  { timestamps: true } // Adding timestamps to track when the test was created or updated
);

module.exports = mongoose.model("Test", testSchema);
