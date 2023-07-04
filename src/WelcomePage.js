import React, { useState } from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import HomePage from './HomePage';
import bcrypt from 'bcryptjs'

function WelcomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);


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



  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
  
      Axios.post('http://localhost:3001/login', {
        username: username,
        password: hashedPassword,
      }).catch((error) => {
        if (error.response && error.response.status === 409) {
          const errorMessage = error.response.data;
          const errorElement = document.getElementById('error-message');
          errorElement.style.color = 'red';
          errorElement.textContent = errorMessage;

          setTimeout(() => {
            errorElement.textContent = ''; // Clear the error message
          }, 2000); // Display for 2 seconds (2000 milliseconds)
        }
      });
    });
    

    };
  


  const handleSignUp = (event) => {
    event.preventDefault();
  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
  
      Axios.post('http://localhost:3001/register', {
        username: username,
        password: hashedPassword,
      })
        .then((response) => {
          if (response.status === 200) {
            const successElement = document.getElementById('error-message');
            successElement.style.color = 'green';
            successElement.textContent = 'Account created successfully - press login';
  
            setTimeout(() => {
              successElement.textContent = ''; // Clear the success message
            }, 2000); // Display for 2 seconds (2000 milliseconds)
          }
          console.log(response);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            const errorMessage = error.response.data;
            const errorElement = document.getElementById('error-message');
            errorElement.style.color = 'red';
            errorElement.textContent = errorMessage;
  
            setTimeout(() => {
              errorElement.textContent = ''; // Clear the error message
            }, 2000); // Display for 2 seconds (2000 milliseconds)
          }
        });
    });
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
          <div id="error-message"></div>
        </div>
      </form>
      <Routes>
        <Route path="/HomePage" exact element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default WelcomePage;
