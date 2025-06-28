const express = require("express");
const router = express.Router();
const {
  addQuestion,
  getQuestionsByRoom
} = require("../controllers/questionController");

router.post("/add", addQuestion);
router.get("/room/:roomId", getQuestionsByRoom);

module.exports = router;
