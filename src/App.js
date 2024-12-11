import React from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Header />
        <MainContent />
      </div>
      <RightSidebar />
    </div>
  );
}

export default App; 