import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot from react-dom/client
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
