const express = require("express");
const router = express.Router();
const TestRoom = require("../models/TestRoom");
const { generateAccessCode } = require("../utils/generateCode");

// POST: Create a new test room
router.post("/create", async (req, res) => {
  try {
    const { roomName, questions } = req.body;

    // Validation: Ensure that all fields are properly filled
    if (!roomName || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Room name and questions are required" });
    }

    // Validate each question has options and a correctAnswer
    for (let idx = 0; idx < questions.length; idx++) {
      const question = questions[idx];
      if (
        !question.question ||
        typeof question.correctAnswer !== 'number' ||
        !question.options ||
        question.options.length < 4
      ) {
        return res.status(400).json({ message: `Invalid or missing data for question ${idx + 1}` });
      }

      if (![0, 1, 2, 3].includes(question.correctAnswer)) {
        return res.status(400).json({ message: `Invalid correct answer for question ${idx + 1}` });
      }
    }

    // Generate a unique 6-digit access code
    const accessCode = await generateAccessCode();

    // Create the test room
    const newTestRoom = new TestRoom({
      roomName,
      roomCode: accessCode,
      questions,
    });

    await newTestRoom.save();

    return res.status(201).json({
      message: "Test room created successfully",
      roomCode: accessCode,
      roomId: newTestRoom._id,
    });
  } catch (error) {
    console.error("Error creating test room:", error);
    return res.status(500).json({ message: "Error creating test room", error: error.message });
  }
});

// GET: Fetch test room details using roomCode
router.get("/:roomCode", async (req, res) => {
  try {
    const { roomCode } = req.params;

    const roomCodeRegex = /^[A-Za-z0-9]{6}$/;
    if (!roomCodeRegex.test(roomCode)) {
      return res.status(400).json({ message: "Invalid room code format. It should be 6 alphanumeric characters." });
    }

    const room = await TestRoom.findOne({ roomCode }).exec();

    if (!room) {
      return res.status(404).json({ message: "Test room not found" });
    }

    return res.status(200).json({
      roomId: room._id,
      roomName: room.roomName,
      questions: room.questions,
      message: "Test room found",
    });
  } catch (error) {
    console.error("Error fetching test room:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
