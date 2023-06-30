import React, { useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [selectedView, setSelectedView] = useState('calendar');

  const handleViewChange = (viewType) => {
    setSelectedView(viewType);
  };

  const handleNewTaskClick = () => {
    console.log('Create New Task clicked');
    // Add your logic for creating a new task here
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Scheduler</h1>
      <div className="view-options">
        <button
          className={`view-button ${selectedView === 'calendar' ? 'active' : ''}`}
          onClick={() => handleViewChange('calendar')}
        >
          Calendar View
        </button>
        <button
          className={`view-button ${selectedView === 'taskList' ? 'active' : ''}`}
          onClick={() => handleViewChange('taskList')}
        >
          Task List View
        </button>
      </div>
      <button className="new-task-button" onClick={handleNewTaskClick}>
        Create New Task
      </button>
    </div>
  );
}

export default HomePage;

