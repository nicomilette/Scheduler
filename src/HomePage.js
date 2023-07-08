import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import './HomePage.css';
import './Calendar.css';
import Cookies from 'js-cookie';
import Axios from 'axios';

function HomePage() {
  

  {/*DATA MEMBERS*/}
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('calendar');
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [today, setToday] = useState(new Date());
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);

  const [dragPosition, setDragPosition] = useState({ x: 400, y: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);


  

  useEffect(() => {

    Axios.post('http://localhost:3001/fetchusername', {
      session_id: Cookies.get("session_id"),
    }).then((response) => {
      setUsername(response.data);
    }).catch((error) => {

      console.log(error);
    });

    Axios.post('http://localhost:3001/fetchtasks', {
      session_id: Cookies.get("session_id"),
    }).then((response) => {
      setTasks(response.data);
    }).catch((error) => {

      console.log(error);
    });

    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        setDragPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    if (e.target === popupRef.current) {
      e.preventDefault();
      setIsDragging(true);
      const xOffset = e.clientX - dragPosition.x;
      const yOffset = e.clientY - dragPosition.y;
      setDragOffset({ x: xOffset, y: yOffset });
    }
  };

  
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

  const handleCancelNewTask = () => {
    setShowNewTaskPopup(false);
    setTitle('');
    setDetails('');
    setDate('');
    setTime('');
  };

  const handleSaveNewTask = () => {
    if (title) {
      let isValid = true;
  
      // Convert ISO string format to YYYY-MM-DD format
      
      const convertedDate = selectedDate.toISOString().split('T')[0];
  

  
      // Check if the time is in the proper format (HH:MM AM/PM)
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
      if (time && !timeRegex.test(time)) {
        isValid = false;
        // Display an error or provide feedback to the user about the invalid time format
        console.log("Invalid time format. Please use the format HH:MM AM/PM.");
      }
  
      if (isValid) {

        Axios.post('http://localhost:3001/posttask', {
          session_id: Cookies.get("session_id"),
          title: title,
          details: details,
          date: convertedDate,
          time: time,
          index: tasks.length,
        }).then((response) => {
          console.log(response.data);
        }).catch((error) => {

          console.log(error);
        });


        const newTask = { title, details, date: convertedDate, time };
        setTasks([...tasks, newTask]);
        setTitle('');
        setDetails('');
        setDate('');
        setTime('');
  
  
        setShowNewTaskPopup(false);


      }
    } else {
      // Display an error or provide feedback to the user about the required fields
      console.log("Please fill in all the required fields.");
    }
  };
  
  

  const handleDeleteTask = (index) => {
    Axios.post('http://localhost:3001/deletetask', {
      session_id: Cookies.get("session_id"),
      index: index,
    });
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };


  const handleLogOut = () => {
    Axios.post('http://localhost:3001/logout', {
      session_id: Cookies.get("session_id"),
    });


    Cookies.set('session_id', '');
    window.location.reload();
  }

 
{/*BUTTON*/}
  return (


    <div className="home-page">
      <div className="title">
      <h1 className="home-title">Scheduler</h1>
      <h1 className="username-title">{username}</h1>
      </div>
    <div className='button-options-wrap'>

      
      <button className="button-options" onClick={handleNewTaskClick}>
        New
      </button>

      <button className="button-options" onClick={handleLogOut}>
        Log Out
      </button>
    </div>



      <div className="view-options">
        <button
          className={`view-button ${selectedView === 'calendar' ? 'active' : ''}`}
          onClick={() => handleViewChange('calendar')}
        >
          Calendar
        </button>

        <button
          className={`view-button ${selectedView === 'taskList' ? 'active' : ''}`}
          onClick={() => handleViewChange('taskList')}
        >
          To-Do
        </button>

      </div>



{/*CALENDAR*/}


      {selectedView === 'calendar' && (
        <div className="calendar-view">
          <div>
          <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="US"
        activeStartDate={today}
        onActiveStartDateChange={({ value, activeStartDate, action }) => {
          if (action === 'next' || action === 'prev') {
            setToday(new Date(activeStartDate));
          }
        }}
          tileContent={({ date, view }) => {
            const tasksOnDay = tasks.filter((task) => {
              const taskDate = new Date(new Date(task.date).setDate(new Date(task.date).getDate() + 1)).toLocaleDateString();
              return taskDate === date.toLocaleDateString();
            });

            return (
              <div className="my-tile-content">
                {tasksOnDay.map((task, index) => {
                  return (
                    <button
                      key={index}
                      className="my-calendar-task"
                      onClick={() => setSelectedTaskIndex(index)}
                    >
                      {task.title}
                    </button>
                  );
                })}
            
                <div className="my-new-class-calendar">
                  <button
                    className="my-new-task-calendar"
                    onClick={() => {
                      setShowNewTaskPopup(true);
                      setSelectedDate(date);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            );
            
          }}
/>

    </div>
  </div>
)}


{/*TASK LIST*/}


        {selectedView === 'taskList' && (
          <div className="task-list">
            {tasks && tasks.length > 0 ? (
              tasks
                .sort((task1, task2) => {
                  const taskDate1 = new Date(task1.date);
                  const taskDate2 = new Date(task2.date);
                  return taskDate1 - taskDate2;
                })
                .map((task, index) => (
                  <div key={index} className="task-item">
                    <h3>{task.title}</h3>
                    {task.date && (
                <>
                    <p>
                      {new Date(new Date(task.date).setDate(new Date(task.date).getDate())).toLocaleDateString()}{' '}
                      {task.time && <span>{task.time}</span>}
                    </p>
                    <p>{task.details}</p>
                    {/* Check if task is past due */}
                    {new Date(task.date) < new Date() && (
                      <div className="past-due">
                        <p className="past-due-label">Past Due</p>
                      </div>
                    )}
                  </>
                )}

                  {!task.date && (
                    <p>No date specified</p>
                  )}
                  <button onClick={() => handleDeleteTask(index)}>Delete</button>
                </div>
              ))
          ) : (
            <p>No tasks</p>
          )}
        </div>
      )}





{/*NEW TASK POPUP*/}


      {showNewTaskPopup && (
        <div className="new-task-popup" ref={popupRef}
        
        style={{ top: dragPosition.y, left: dragPosition.x }}
        onMouseDown={handleMouseDown}>
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
          <input
            className="dateInput"
            type="text"
            placeholder="Date (YYYY-MM-DD)"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Time (HH:MM AM/PM) - Optional"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className="new-task-popup-buttons">
            <button className="save-task-button" onClick={() => handleSaveNewTask()}>
              Save
            </button>
            <button className="cancel-task-button" onClick={() => handleCancelNewTask()}>
              Cancel
            </button>
          </div>
        </div>
      )}



{selectedTaskIndex !== -1 && (
  <div className="task-popup">
    <h2>{tasks[selectedTaskIndex].title}</h2>
    <p>Date: {tasks[selectedTaskIndex].date}</p>
    <p>Time: {tasks[selectedTaskIndex].time}</p>
    <p>Details: {tasks[selectedTaskIndex].details}</p>
    <button onClick={() => setSelectedTaskIndex(-1)}>Close</button>
  </div>
)}



    </div>
  );
}

export default HomePage;

