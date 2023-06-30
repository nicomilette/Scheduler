

import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling
import { BrowserRouter as Router, Link, Route, Routes, useNavigate, navigate } from 'react-router-dom';




import HomePage from './HomePage';


function WelcomePage() {

  const navigate = useNavigate();

  const handleOpenHomePage = () => {
    navigate('/homepage');
  };

  return (
    <div className="welcome-page">
      <h1 className="welcome-title">Welcome to the schedule maker</h1>
      

      <Link to="/homepage">
          <button onClick={handleOpenHomePage}>Go to Lorem Ipsum</button>
        </Link>
        <Routes> <Route path="/HomePage" exact element={<HomePage/>} /> </Routes>
    </div>
  );
}

export default WelcomePage;
