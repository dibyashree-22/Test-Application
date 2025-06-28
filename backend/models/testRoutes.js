const express = require("express");
const router = express.Router();
const {
  submitTest,
  getTestResults
} = require("../controllers/testController");

router.post("/submit", submitTest);
router.get("/results/:roomId", getTestResults);

module.exports = router;
