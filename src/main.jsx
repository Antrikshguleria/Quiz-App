import React from 'react';  // Add this import statement at the top of your main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';  // Assuming App.jsx is in the same folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);