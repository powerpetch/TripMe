import React from 'react';
import myWorldGif from '../assets/world.gif';

function RightSidebar() {
  return (
    <div className="right-sidebar">
      <div className="sidebar-content">
        <div className="globe-container">
          <img 
            src={myWorldGif} 
            alt="Spinning Globe" 
            className="globe"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSidebar; 