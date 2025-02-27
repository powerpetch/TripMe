// src/components/header_for_other/MinimalHeader.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/new-logo-green.png';

function MinimalHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      {/* Logo */}
      <div onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" style={{ height: '40px', cursor: 'pointer' }} />
      </div>

      {/* Search bar */}
      <div className="flex items-center">
        <input
          type="text"
          className="border p-1 mr-2"
          placeholder="Search..."
        />
        <button 
          className="px-3 py-1 border bg-green-500 text-white rounded"
          onClick={() => alert('Search clicked!')}
        >
          Search
        </button>
      </div>

      {/* Sign In / โปรไฟล์ผู้ใช้ (ตัวอย่าง) */}
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate('/login')}
      >
        Sign In
      </button>
    </header>
  );
}

export default MinimalHeader;
