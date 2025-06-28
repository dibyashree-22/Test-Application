const TestRoom = require('../models/TestRoom');

// Function to generate a unique 6-digit alphanumeric code
const generateAccessCode = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const existingRoom = await TestRoom.findOne({ roomCode: code });
    if (!existingRoom) {
      isUnique = true;
    }
  }

  return code;
};

module.exports = { generateAccessCode };
