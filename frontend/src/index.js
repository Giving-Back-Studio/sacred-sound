import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.style.minHeight = '98vh';
document.body.style.backgroundColor = 'rgb(248, 248, 248)';
document.body.style.margin = "0px";