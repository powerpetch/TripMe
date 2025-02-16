// src/components/map/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoGreen from '../../images/new-logo-green.png';
import { FaSearch } from "react-icons/fa";
import { Autocomplete } from '@react-google-maps/api';

function Header({ onSearchLocation }) {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState(null);

  // เมื่อ Autocomplete โหลดเสร็จ => เก็บ instance ไว้ใน state
  const handleAutoLoad = (auto) => {
    setAutocomplete(auto);
  };

  // เมื่อผู้ใช้เลือกสถานที่ (onPlaceChanged)
  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      console.log('Autocomplete place =>', place);
      if (place?.geometry) {
        onSearchLocation(place);
      }
    }
  };

  // ปุ่ม “Go” (fallback ถ้า user ไม่เลือกจาก Dropdown)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User pressed Go, fallback logic here if needed');
  };

  return (
    <header className="bg-white shadow py-2 px-4 flex items-center justify-between sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img src={logoGreen} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-sm ml-4">
        <div className="
          flex items-center bg-gray-100
          border border-transparent
          focus-within:border-green-500
          rounded-full px-2 py-1
          transition-colors
        " style={{ minWidth: '200px' }}>
          {/* ไอคอน Search ด้านซ้าย */}
          <FaSearch className="text-gray-500 mr-2" />

          {/* ครอบ input ด้วย <Autocomplete> */}
          <div className="flex-1">
            <Autocomplete
              onLoad={handleAutoLoad}
              onPlaceChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent focus:outline-none text-sm"
              />
            </Autocomplete>
          </div>

          {/* ปุ่ม Go ด้านขวาสุด */}
          <button
            type="submit"
            className="
              bg-green-600 hover:bg-green-700
              text-white font-medium
              px-3 py-1
              rounded-full
              transition-colors
              text-sm
            "
          >
            Go
          </button>
        </div>
      </form>
    </header>
  );
}

export default Header;
