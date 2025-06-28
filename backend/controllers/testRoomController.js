const TestRoom = require("../models/TestRoom"); // Import your TestRoom model

// POST: Create a new test room
exports.createTestRoom = async (req, res) => {
  const { roomName, questions } = req.body;

  // Validate that room name and questions are provided
  if (!roomName || !questions || questions.length === 0) {
    return res.status(400).json({ message: "Room name and questions are required" });
  }

  // Validate that each question has options and a correctAnswer
  questions.forEach((question, idx) => {
    if (!question.question || !question.correctAnswer || !question.options) {
      return res.status(400).json({ message: `Missing data for question ${idx + 1}` });
    }
  });

  try {
    // Generate a unique 6-character room code
    const generateAccessCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      return code;
    };

    // Generate the room code
    const roomCode = generateAccessCode();

    // Create the test room
    const newTestRoom = new TestRoom({
      roomName,
      roomCode, // Save the access code
      questions,
    });

    // Save the new test room to the database
    await newTestRoom.save();

    // Send the response with the room details, including the access code
    res.status(201).json({
      message: "Test room created successfully",
      roomCode, // Send the access code back to the frontend
      roomId: newTestRoom._id, // Send the room ID back as well
    });
  } catch (error) {
    console.error("Error creating test room:", error);
    res.status(500).json({ message: "Error creating test room", error: error.message });
  }
};
