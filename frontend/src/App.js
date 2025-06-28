import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing components and pages
import Header from "./components/Header";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TestSubmitPage from "./pages/TestSubmitPage";
import TestResultsPage from "./pages/TestResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import TestPage from "./pages/TestPage";
import TestRoomAccessPage from "./pages/TestRoomAccessPage";
import CreateTestRoomPage from "./pages/CreateTestRoomPage"; // ✅ New import

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Create Test Room */}
        <Route path="/create-test-room" element={<CreateTestRoomPage />} /> {/* Correct this */}
 {/* ✅ New route */}

        {/* Enter access code to join a room */}
        <Route path="/access-test-room" element={<TestRoomAccessPage />} />

        {/* Take test */}
        <Route path="/test/:roomId" element={<TestPage />} />

        {/* Submit test */}
        <Route path="/test/:roomId/submit" element={<TestSubmitPage />} />

        {/* View test results */}
        <Route path="/test/:roomId/results" element={<TestResultsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
