import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';

function Routing() {
  return (
    <Routes>
      <Route exact path="/" component={WelcomePage} />
      <Route path="/homepage" component={HomePage} />
    </Routes>
  );
}

export default Routing;


