const mongoose = require('mongoose');

const testRoomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswer: {
        type: Number, // index (0-3)
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('TestRoom', testRoomSchema);
