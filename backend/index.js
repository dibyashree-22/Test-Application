const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const questionRoutes = require("./routes/questionRoutes");
const noteRoutes = require("./routes/noteRoutes");
const testRoutes = require("./routes/testRoutes");
const testRoomRoutes = require("./routes/testRoom");
const testResultRoutes = require("./routes/testResult");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tests", testRoutes); // Optional - your legacy tests
app.use("/api/testrooms", testRoomRoutes); // ✅ Room data and questions
app.use("/api/testresults", testResultRoutes); // ✅ Submit + result logic

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
