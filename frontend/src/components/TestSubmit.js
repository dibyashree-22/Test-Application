import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestSubmit = () => {
  const { roomId } = useParams(); // Get roomId from the URL parameter
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions for the room from backend
    axios
      .get(`/api/questions/room/${roomId}`)
      .then((response) => {
        setQuestions(response.data);
        setAnswers(new Array(response.data.length).fill(null)); // Set empty answers initially
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
        setLoading(false);
      });
  }, [roomId]);

  const handleChange = (index, selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const testData = {
      studentId: "student_id", // Replace with the student's ID from state or context
      roomId: roomId,
      answers: questions.map((question, index) => ({
        questionId: question._id,
        selectedOption: answers[index],
      })),
    };

    axios
      .post("/api/tests/submit", testData)
      .then((response) => {
        alert("Test submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting test!", error);
      });
  };

  return (
    <div>
      <h2>Test Submission</h2>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          {questions.map((question, index) => (
            <div key={question._id}>
              <p>{question.questionText}</p>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleChange(index, optionIndex)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Test</button>
        </div>
      )}
    </div>
  );
};

export default TestSubmit;
