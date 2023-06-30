import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './HomePage.css';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('calendar');
  const [tasks, setTasks] = useState([]);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleViewChange = (viewType) => {
    setSelectedView(viewType);
  };

  const handleNewTaskClick = () => {
    setShowNewTaskPopup(true);
  };

  const handleSaveNewTask = () => {
    if (title && details) {
      const newTask = { title, details };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDetails('');
    }
    setShowNewTaskPopup(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
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
      {selectedView === 'calendar' && (
  <div className="calendar-view">
    <h2>Calendar View:</h2>
    <div>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </div>
  </div>
)}

      {selectedView === 'taskList' && (
        <>
          <h2>Tasks:</h2>
          <div className="task-list">
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <h3>{task.title}</h3>
                  <p>{task.details}</p>
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </>
      )}
      {showNewTaskPopup && (
        <div className="new-task-popup">
          <h2 className="new-task-popup-title">New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div className="new-task-popup-buttons">
            <button className="save-task-button" onClick={() => handleSaveNewTask()}>
              Save
            </button>
            <button className="cancel-task-button" onClick={() => setShowNewTaskPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

