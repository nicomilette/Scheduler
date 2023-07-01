/* existing imports */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/welcomepage",
    element: <WelcomePage />,
  },
];

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <RouterProvider routes={routes} />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

/*


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);





ReactDOM.createRoot( <BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/