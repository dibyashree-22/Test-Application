const TestRoom = require("../models/TestRoom");
const { generateCode } = require("../utils/generateCode"); // Assuming generateCode is used for generating 6-digit alphanumeric code

// Create a new test room
exports.createRoom = async (req, res) => {
  const { roomName, questions, teacherId } = req.body;  // Assuming `roomName` is sent, along with `questions` and `teacherId`

  try {
    const roomCode = generateCode();  // Generate a 6-character code for the test room

    // Create a new test room
    const newTestRoom = new TestRoom({
      roomCode,  // The 6-digit code for the room
      roomName,  // Name of the room
      questions, // List of questions for the room
      teacherId, // Teacher ID associated with the test room
    });

    // Save the new test room to the database
    await newTestRoom.save();

    // Send the response with the room details, including the access code
    res.status(201).json({
      message: "Test room created successfully",
      roomCode: roomCode, // Return the 6-digit room code back to the front end
      roomId: newTestRoom._id, // Optionally return room ID
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating test room", error: error.message });
  }
};

// Get all rooms created by a specific teacher (optional if needed)
exports.getRoomsByTeacher = async (req, res) => {
  const { teacherId } = req.params;

  try {
    // Find rooms by teacher ID
    const rooms = await TestRoom.find({ teacherId });

    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found for this teacher" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms", error: error.message });
  }
};
