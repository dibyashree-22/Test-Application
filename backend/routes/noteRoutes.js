const express = require("express");
const router = express.Router();
const { addNote, getNotesByRoom } = require("../controllers/noteController");

router.post("/add", addNote);
router.get("/room/:roomId", getNotesByRoom);

module.exports = router;
