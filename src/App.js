import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
    <div>
      <Router>
          <Routes>
            
            <Route element={<WelcomePage/>} path="/"/>
            <Route element={<ProtectedRoute />}>
                <Route element={<HomePage/>} path="/homepage" exact/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
