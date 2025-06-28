import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TestPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [error, setError] = useState("");

  // Fetch test room data on component mount
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`/api/testrooms/${roomId}`);
        setRoomData(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null)); // Ensure answer array has proper length
      } catch (error) {
        setError("Error fetching test room data.");
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmitTest = async () => {
    // Optional: Check if any question is unanswered
    if (answers.includes(null)) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      const response = await axios.post(`/api/testresults/${roomId}/submit`, {
        answers,
      });
      if (response.status === 200) {
        setIsTestCompleted(true);
      }
    } catch (error) {
      setError("Error submitting test. Please try again.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {roomData ? (
        <div>
          <h2>{roomData.roomName}</h2>
          {roomData.questions.map((question, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <p>{index + 1}. {question.question}</p>
              {Object.values(question.options).map((option, optionIndex) => (
                <label key={optionIndex} style={{ display: "block", marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmitTest}>Submit Test</button>
        </div>
      ) : (
        <p>Loading test questions...</p>
      )}

      {isTestCompleted && (
        <button onClick={() => navigate(`/test/${roomId}/results`)}>
          View Results
        </button>
      )}
    </div>
  );
};

export default TestPage;
