// /src/pages/TestRoomAccessPage.js
import React, { useState } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import { useNavigate } from "react-router-dom";
import "./TestRoomAccessPage.css"; // Optional CSS file for styling

const TestRoomAccessPage = () => {
  const [accessCode, setAccessCode] = useState(""); // Store the access code entered by the user
  const [error, setError] = useState(""); // Store any error messages
  const [isValidRoom, setIsValidRoom] = useState(false); // Whether the room is valid or not
  const navigate = useNavigate();

  const handleAccessCodeSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    try {
      // Make an API request to validate the access code
      const res = await axios.get(`http://localhost:5000/api/testrooms/${accessCode}`);
      
      // If room exists, navigate to the test room page
      if (res.data) {
        setIsValidRoom(true); // Mark the room as valid
      }
    } catch (err) {
      setError("Invalid access code. Please try again.");
      setIsValidRoom(false); // Mark the room as invalid
    }
  };

  return (
    <div className="test-room-access-container">
      <h2>Enter Access Code for Test Room</h2>
      <form onSubmit={handleAccessCodeSubmit}>
        <input
          type="text"
          placeholder="Enter access code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)} // Update access code state
          required
        />
        <button type="submit">Verify</button>
      </form>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the "Go to Test Room" button if access code is valid */}
      {isValidRoom && (
        <button
          onClick={() => navigate(`/test/${accessCode}`)} // Navigate to the specific test room
          className="go-to-test-room-btn"
        >
          Go to Test Room
        </button>
      )}
    </div>
  );
};

export default TestRoomAccessPage;
