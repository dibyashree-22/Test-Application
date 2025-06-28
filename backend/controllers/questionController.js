const Question = require("../models/Question");

exports.addQuestion = async (req, res) => {
  const { roomId, questionText, options, correctOption } = req.body;

  try {
    const question = await Question.create({
      roomId,
      questionText,
      options,
      correctOption,
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Failed to add question", error: error.message });
  }
};

exports.getQuestionsByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const questions = await Question.find({ roomId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to get questions", error: error.message });
  }
};
