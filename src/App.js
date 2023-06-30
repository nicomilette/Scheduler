import React from 'react';
import WelcomePage from './WelcomePage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <WelcomePage />
        <div className="content">
          <Routes>
            <Route path="/">
              <WelcomePage />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
