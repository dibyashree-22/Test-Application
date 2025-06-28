import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TestResultPage = () => {
  const { roomId } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/testresults/${roomId}/results`);
        setResult(response.data);
      } catch (err) {
        setError("Error fetching results.");
      }
    };

    fetchResults();
  }, [roomId]);

  const getOptionStyle = (optionIndex, correct, selected) => {
    if (optionIndex === correct && optionIndex === selected) {
      return { backgroundColor: "#c8f7c5" }; // green - correct selected
    }
    if (optionIndex === selected && selected !== correct) {
      return { backgroundColor: "#f7c5c5" }; // red - wrong selected
    }
    if (optionIndex === correct) {
      return { backgroundColor: "#d3e5ff" }; // blue - correct answer
    }
    return {};
  };

  return (
    <div style={{ padding: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result ? (
        <div>
          <h2>Test Results</h2>
          <p>
            Score: {result.score} / {result.total}
          </p>
          {result.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <p>
                <strong>{index + 1}. {q.question}</strong>
              </p>
              {Object.values(q.options).map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "4px",
                    ...getOptionStyle(optionIndex, q.correctAnswer, q.selectedAnswer),
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
};

export default TestResultPage;
