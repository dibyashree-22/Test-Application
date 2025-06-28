const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestRoom", // References the TestRoom model
      required: true,
    },
    answers: {
      type: [Number], // Store the selected answer indices (e.g., [0, 1, 3])
      required: true,
    },
    score: {
      type: Number, // Store the score (e.g., number of correct answers)
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("TestResult", testResultSchema);
