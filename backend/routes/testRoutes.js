const express = require("express");
const router = express.Router();
const { submitTest, getTestResults } = require("../controllers/testController");

// POST: Submit test answers and calculate score
router.post("/:roomId/submit", submitTest);

// GET: Fetch test results for a specific room by roomId
router.get("/results/:roomId", getTestResults);

module.exports = router;
