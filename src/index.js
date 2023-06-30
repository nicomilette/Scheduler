/* existing imports */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/welcomepage",
    element: <WelcomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
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