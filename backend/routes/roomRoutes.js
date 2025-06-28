const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRoomsByTeacher
} = require("../controllers/roomController");

// Create a new room
router.post("/create", createRoom);

// Get all rooms created by a teacher
router.get("/teacher/:teacherId", getRoomsByTeacher);

module.exports = router;
