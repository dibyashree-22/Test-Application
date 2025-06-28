import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTestRoomPage.css";

const CreateTestRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ option1: "", option2: "", option3: "", option4: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Function to add a question to the question list
  const handleAddQuestion = () => {
    if (
      !question ||
      !options.option1 ||
      !options.option2 ||
      !options.option3 ||
      !options.option4 ||
      !correctAnswer
    ) {
      setError("Please fill out all fields before adding the question.");
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer: options[correctAnswer], // Store the actual correct answer text
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions({ option1: "", option2: "", option3: "", option4: "" });
    setCorrectAnswer("");
    setError("");
  };

  // Function to create the test room
  const handleCreateTestRoom = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/testrooms/create", {
        roomName,
        questions,
      });

      if (response.status === 201) {
        const roomCode = response.data.roomCode || response.data.roomId;
        setSuccessMessage("Test room created successfully!");
        navigate(`/test/${roomCode}`);
      }
    } catch (error) {
      setError("Failed to create the test room. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="create-test-room-container">
      <h2>Create Test Room</h2>

      {/* Room Name Input */}
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        required
      />

      {/* Add Questions Section */}
      <div className="question-container">
        <h3>Add MCQ Questions</h3>

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="options-container">
          {["option1", "option2", "option3", "option4"].map((key) => (
            <input
              key={key}
              type="text"
              placeholder={`Option ${key.slice(-1)}`}
              value={options[key]}
              onChange={(e) => setOptions({ ...options, [key]: e.target.value })}
            />
          ))}
        </div>

        {/* Correct Answer Dropdown */}
        <select
          onChange={(e) => setCorrectAnswer(e.target.value)}
          value={correctAnswer}
        >
          <option value="">Select Correct Answer</option>
          {["option1", "option2", "option3", "option4"].map((key) => (
            <option key={key} value={key}>
              {options[key] || `Option ${key.slice(-1)}`}
            </option>
          ))}
        </select>

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleAddQuestion}>Add Question</button>
      </div>

      {/* Display Added Questions */}
      <div className="question-list">
        <h4>Added Questions</h4>
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              <p>{q.question}</p>
              <ul>
                {Object.values(q.options).map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <p>
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Success or Error Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Create Test Room Button */}
      <button
        onClick={handleCreateTestRoom}
        disabled={!roomName || questions.length === 0}
      >
        Create Test Room
      </button>
    </div>
  );
};

export default CreateTestRoomPage;
