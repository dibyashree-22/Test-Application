const express = require("express");
const router = express.Router();
const TestRoom = require("../models/TestRoom"); // Assuming a TestRoom model

// Get room data and questions
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await TestRoom.findById(roomId).populate("questions");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room data" });
  }
});

// Submit answers and calculate results
router.post("/:roomId/submit", async (req, res) => {
  const { roomId } = req.params;
  const { answers } = req.body;

  try {
    // Assuming you have logic to evaluate the answers
    const room = await TestRoom.findById(roomId);
    const score = evaluateAnswers(room.questions, answers); // Custom function to evaluate answers
    res.status(200).json({ score });
  } catch (error) {
    res.status(500).json({ message: "Error submitting test" });
  }
});

// Get results for a room (e.g., after test completion)
router.get("/:roomId/results", async (req, res) => {
  const { roomId } = req.params;
  try {
    // Fetch results from the database
    const room = await TestRoom.findById(roomId).populate("results"); // Assuming results are stored
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;
