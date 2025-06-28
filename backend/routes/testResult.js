const express = require("express");
const router = express.Router();
const TestRoom = require("../models/TestRoom");
const TestResult = require("../models/TestResult");

// POST: Submit test answers
router.post("/:roomId/submit", async (req, res) => {
  const { roomId } = req.params;
  const { answers } = req.body;

  try {
    const room = await TestRoom.findById(roomId);
    if (!room) return res.status(404).json({ message: "Test room not found" });

    let score = 0;
    const questions = room.questions.map((q, idx) => {
      const correctAnswer = q.correctAnswer;
      const selectedAnswer = answers[idx];

      if (selectedAnswer === correctAnswer) score++;

      return {
        question: q.question,
        options: q.options,
        correctAnswer,
        selectedAnswer,
      };
    });

    const testResult = new TestResult({
      roomId,
      answers,
      score,
    });

    await testResult.save();

    return res.status(200).json({
      message: "Test submitted successfully",
      score,
      total: room.questions.length,
      questions,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error submitting test", error: err.message });
  }
});

// GET: Fetch test results
router.get("/:roomId/results", async (req, res) => {
  const { roomId } = req.params;

  try {
    const testResult = await TestResult.findOne({ roomId }).sort({ createdAt: -1 });

    if (!testResult) return res.status(404).json({ message: "Test results not found" });

    const room = await TestRoom.findById(roomId);
    if (!room) return res.status(404).json({ message: "Test room not found" });

    const questions = room.questions.map((q, idx) => {
      return {
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        selectedAnswer: testResult.answers[idx],
      };
    });

    return res.status(200).json({
      score: testResult.score,
      total: room.questions.length,
      questions,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

module.exports = router;
