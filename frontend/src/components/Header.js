import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user"); // Get user data from localStorage
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set the user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Reset user state
    navigate("/login"); // Navigate to login page
  };

  return (
    <header className="app-header">
      <nav className="navbar">
        <h2 className="logo">
          <Link to="/">TestApp</Link>
        </h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li className="user-name">Hi, {user.name}</li> {/* Show username if logged in */}
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li> {/* Logout button */}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
