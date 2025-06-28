import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [accessCode, setAccessCode] = useState(""); // Store the access code entered by the user
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication status
  const navigate = useNavigate(); // Navigation function

  useEffect(() => {
    // Check for authentication status from local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true); // If a valid token and user exist, consider the user authenticated
    }
  }, []);

  // Handle navigating to the test room based on the access code
  const handleJoinTestRoom = () => {
    if (accessCode.trim()) {
      // If the access code is not empty or just whitespace, navigate to the test room
      navigate(`/test/${accessCode.trim()}`);
    } else {
      // Otherwise, alert the user to enter a valid access code
      alert("Please enter a valid access code.");
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to the Online Test Application</h1>
      <p className="homepage-description">
        Teachers can create rooms and conduct online tests. Students can join a test using a unique room code.
      </p>
      <p className="homepage-description">
        Teachers can also upload notes for students to study before taking the test.
      </p>

      {isAuthenticated ? (
        <div className="homepage-actions">
          {/* Button to navigate to Create Test Room page */}
          <button
            className="create-room-btn"
            onClick={() => navigate("/create-test-room")}
          >
            Create Test Room
          </button>

          <div className="join-room-container">
            {/* Input field to enter the access code */}
            <input
              type="text"
              placeholder="Enter Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)} // Update access code on input change
              className="access-code-input"
            />
            {/* Button to join the test room */}
            <button
              className="join-room-btn"
              onClick={handleJoinTestRoom} // Trigger the navigation based on the entered access code
            >
              Join Test Room
            </button>
          </div>
        </div>
      ) : (
        <p className="login-reminder">
          Please log in to create or join a test room.
        </p>
      )}
    </div>
  );
};

export default HomePage;
