import React, { useState } from "react";
import axios from "axios";
import "./CreateTestRoomPage.css";

const CreateTestRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: { option1: "", option2: "", option3: "", option4: "" },
      correctAnswer: "",
    },
  ]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field.startsWith("option")) {
      updatedQuestions[index].options[field] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: { option1: "", option2: "", option3: "", option4: "" },
        correctAnswer: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert options object to array and correctAnswer to index
      const formattedQuestions = questions.map((q) => {
        const optionsArray = [
          q.options.option1,
          q.options.option2,
          q.options.option3,
          q.options.option4,
        ];

        const correctAnswerIndex = ["option1", "option2", "option3", "option4"].indexOf(
          q.correctAnswer
        );

        return {
          question: q.question,
          options: optionsArray,
          correctAnswer: correctAnswerIndex,
        };
      });

      const response = await axios.post("http://localhost:5000/api/testrooms/create", {
        roomName,
        questions: formattedQuestions,
      });

      setSuccess(`Room created! Room Code: ${response.data.roomCode}`);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create test room.");
      setSuccess(null);
    }
  };

  return (
    <div className="create-room-container">
      <h2>Create a Test Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />

        {questions.map((q, idx) => (
          <div key={idx} className="question-block">
            <h4>Question {idx + 1}</h4>
            <input
              type="text"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
              required
            />
            {["option1", "option2", "option3", "option4"].map((opt) => (
              <input
                key={opt}
                type="text"
                placeholder={`Enter ${opt}`}
                value={q.options[opt]}
                onChange={(e) => handleQuestionChange(idx, opt, e.target.value)}
                required
              />
            ))}

            <select
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(idx, "correctAnswer", e.target.value)}
              required
            >
              <option value="">Select correct option</option>
              {["option1", "option2", "option3", "option4"].map((opt) => (
                <option key={opt} value={opt}>
                  {q.options[opt] || `Option ${opt.slice(-1)}`}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Another Question
        </button>

        <button type="submit">Submit</button>
      </form>

      {success && <p className="success-msg">{success}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default CreateTestRoomPage;
