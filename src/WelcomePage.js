

import React from 'react';
import './WelcomePage.css'; // Import the CSS file for styling

function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1 className="welcome-title">Welcome to the Schedule Maker</h1>
      <button className="enter-button" onClick={() => console.log('Enter clicked')}>
        Enter
      </button>
    </div>
  );
}

export default WelcomePage;
