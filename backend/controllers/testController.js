const Test = require("../models/Test");
const TestRoom = require("../models/TestRoom"); // Assuming you have a TestRoom model for fetching test data

// Submit the test answers and calculate score
exports.submitTest = async (req, res) => {
  const { studentId, roomId, answers } = req.body;

  try {
    // Fetch the test room and questions for this room
    const room = await TestRoom.findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ message: "Test room not found" });
    }

    let score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Compare the student's answers with the correct answers for each question
    room.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
        correctAnswers += 1;
      } else {
        incorrectAnswers += 1;
      }
    });

    // Create a new Test record with the student's answers and calculated score
    const test = await Test.create({
      studentId,
      roomId,
      answers,
      score,
      correctAnswers,
      incorrectAnswers
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit test", error: error.message });
  }
};

// Get test results for a specific room
exports.getTestResults = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Fetch all test results for the specific room
    const results = await Test.find({ roomId })
      .populate("studentId", "name email") // Populate student info
      .select("studentId score correctAnswers incorrectAnswers"); // Only select relevant fields

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch results", error: error.message });
  }
};
