import React, { useState } from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from './HomePage';

function WelcomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenHomePage = () => {
    navigate('/homepage');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    // Perform signup logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="welcome-page">
      <h1 className="welcome-title">Welcome to the Scheduler</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="button-container">
          <button type="submit" className="login-button" onClick={handleLogin}>
            Login
          </button>
          <button type="submit" className="signup-button" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </form>
      <Routes>
        <Route path="/HomePage" exact element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default WelcomePage;
