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



/*


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