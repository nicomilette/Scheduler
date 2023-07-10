import React, { useState } from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';
import ProtectedRoute from './ProtectedRoute';
import HomePage from './HomePage';


function WelcomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);

  const handleOpenHomePage = () => {
    navigate('/homepage');
  };

  const handleUsernameChange = (event) => {
    const cleanedValue = event.target.value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    setUsername(cleanedValue);
  };
  
  

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/;

    setHasUppercase(uppercaseRegex.test(newPassword));
    setHasLowercase(lowercaseRegex.test(newPassword));
    setHasNumber(numberRegex.test(newPassword));
    setHasSpecialChar(specialCharRegex.test(newPassword));
    setIsLongEnough(newPassword.length >= 8);

    const meetsMinimumRequirements = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough;
   

    setIsLoginDisabled(!meetsMinimumRequirements);
  };

  const handleSignUp = (event) => {
    
    event.preventDefault();
    if(!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar && isLongEnough)){
      const errorElement = document.getElementById('error-message');
      errorElement.style.color = 'red';
      errorElement.textContent = 'Password does not meet requirements';

      setTimeout(() => {
        errorElement.textContent = ''; // Clear the success message
      }, 2000);
      
    }
    else{
  
    const hashedPassword = bcrypt.hashSync(password, 10);

    Axios.post('/register', {
      username: username,
      password: hashedPassword, // Send the plain password to the server
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
        if (error.response) {
          const errorMessage = error.response.data;
          const errorElement = document.getElementById('error-message');
          errorElement.style.color = 'red';
          errorElement.textContent = errorMessage;
  
          setTimeout(() => {
            errorElement.textContent = ''; // Clear the error message
          }, 2000); // Display for 2 seconds (2000 milliseconds)
        }
      });

    }


  };

  const handleLogin = (event) => {
    event.preventDefault();
  
    const isAuthenticated = Cookies.get('session_id') !== undefined && Cookies.get('session_id') !== '';

    const loginData = {
      username: username,
      password: password,
    };
  
    if (isAuthenticated) {
      loginData.session_id = Cookies.get('session_id');
    }
  

    Axios.post('/login', loginData)
    .then((response) => {
      if (response.status === 200) {
        const successElement = document.getElementById('error-message');
        successElement.style.color = 'green';
        successElement.textContent = 'Logging in';

        setTimeout(() => {
          successElement.textContent = ''; // Clear the success message
        }, 2000); // Display for 2 seconds (2000 milliseconds)
        Cookies.set('session_id', response.data);
        handleOpenHomePage();
      }
      console.log(response);
    }).catch((error) => {
      if (error.response) {
        const errorMessage = error.response.data;
        const errorElement = document.getElementById('error-message');
        errorElement.style.color = 'red';
        errorElement.textContent = errorMessage;
  
        setTimeout(() => {
          errorElement.textContent = ''; // Clear the error message
        }, 2000); // Display for 2 seconds (2000 milliseconds)
      }
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
          <button type="submit" className="login-button" onClick={handleLogin} >
            Login
          </button>
          <button type="submit" className="signup-button" onClick={handleSignUp}>
            Sign up
          </button>
          <div id="error-message"></div>
          <div className="requirements-container">
            <p className={hasUppercase ? 'valid' : 'invalid'}>
              Has uppercase
            </p>
            <p className={hasLowercase ? 'valid' : 'invalid'}>
              Has lowercase
            </p>
            <p className={hasNumber ? 'valid' : 'invalid'}>
              Has number
            </p>
            <p className={hasSpecialChar ? 'valid' : 'invalid'}>
              Has special character
            </p>
            <p className={isLongEnough ? 'valid' : 'invalid'}>
              At least 8 characters
            </p>
          </div>
        </div>
      </form>
      <Routes>
      <Route element={<ProtectedRoute />}>
                <Route element={<HomePage/>} path="/homepage" exact/>
        </Route>
        </Routes>
    </div>
  );
}

export default WelcomePage;
