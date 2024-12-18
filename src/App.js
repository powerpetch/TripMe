import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import Map from './components/Map';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/map" element={<Map />} />
        </Routes>
        {location.pathname !== '/map' && <RightSidebar />}
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
