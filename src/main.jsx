import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.jsx'; // 1. Import AppWrapper, NOT App
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper /> {/* 2. Render AppWrapper here */}
  </React.StrictMode>,
);