import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestResults = () => {
  const { roomId } = useParams(); // Get roomId from the URL parameter
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch results for the room from backend
    axios
      .get(`/api/tests/results/${roomId}`)
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the test results!", error);
        setLoading(false);
      });
  }, [roomId]);

  return (
    <div>
      <h2>Test Results</h2>
      {loading ? (
        <p>Loading results...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td>{result.studentId.name}</td>
                  <td>{result.studentId.email}</td>
                  <td>{result.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestResults;
