// client/src/components/header/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/new-logo.png';
import logoGreen from '../../../images/new-logo-green.png';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FaSignInAlt, FaUserCircle } from "react-icons/fa";

import "./header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // state เก็บ user ปัจจุบัน (ถ้ามี)
  const [currentUser, setCurrentUser] = useState(null);
  // toggle dropdown
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // โหลด user จาก localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // ฟังก์ชัน log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  // เมนู dropdown ของ user
  const userMenuDropdown = (
    <div className="absolute top-full right-0 mt-2 w-40 bg-white border shadow py-2 z-50">
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setShowUserMenu(false);
          // ไปหน้า profile
          navigate("/profile");
        }}
      >
        Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setShowUserMenu(false);
          // ไปหน้า setting
          navigate("/setting");
        }}
      >
        Setting
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setShowUserMenu(false);
          // ไปหน้า edit profile
          navigate("/edit-profile");
        }}
      >
        Edit Profile
      </button>
      <hr />
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
      >
        Log Out
      </button>
    </div>
  );

  return (
    <nav className={`navbar ${scrolled ? 'nav-scroll' : ''} transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src={scrolled ? logoGreen : logo}
            alt="Logo"
            className="h-10 transition-transform duration-300"
          />
        </Link>

        {/* Toggle Button (mobile) */}
        <button
          className={`md:hidden ${scrolled ? 'text-black' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AiOutlineMenu size={24} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex items-center space-x-6 text-white">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Translator">Translator</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Currency">Currency</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Map">Map</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Trip-tgt">Trip-tgt</Link></li>
          </ul>

          {/* ถ้าไม่มี currentUser => ปุ่ม Sign In */}
          {!currentUser && (
            <button
            onClick={() => navigate('/login')}
            className={`
              flex items-center justify-center 
              px-4 py-2 
              text-white font-bold 
              rounded-full
              transition-all duration-300 ease-in-out
              border-2
              transform hover:-translate-y-0.5
              ${scrolled 
                ? 'bg-[#2E965E] border-[#2E965E] hover:bg-[#1A7B41] hover:border-[#1A7B41]' 
                : 'bg-transparent border-white hover:bg-[#2E965E] hover:border-[#2E965E]'
              }
            `}>
            Sign In
              <FaSignInAlt className="ml-2" />
            </button>
          )}

          {/* ถ้ามี currentUser => แสดง icon user + dropdown */}
          {currentUser && (
          <div className="relative ml-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`
                flex items-center justify-center 
                w-10 h-10 rounded-full 
                border-2 
                transition-colors
                ${scrolled 
                  ? 'border-grey-700 hover:border-black' 
                  : 'border-white hover:border-grey-900'
                }
              `}
            >
              <FaUserCircle 
                className={`text-2xl ${
                  scrolled ? 'text-grey-700' : 'text-white'
                }`} 
              />
            </button>
            {showUserMenu && userMenuDropdown}
          </div>
        )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 w-3/4 h-full bg-black text-white p-6
          transform transition-transform duration-300 ease-in-out shadow-lg
          flex flex-col space-y-6
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden
        `}
      >
        <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
          <AiOutlineClose size={24} />
        </button>
        
        {/* Search Bar (Mobile) */}
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <AiOutlineSearch className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            className="w-full bg-transparent text-white outline-none"
            placeholder="Search Keywords.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Link className="text-lg text-white" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link className="text-lg text-white" to="/Translator" onClick={() => setMenuOpen(false)}>Translator</Link>
        <Link className="text-lg text-white" to="/Currency" onClick={() => setMenuOpen(false)}>Currency</Link>
        <Link className="text-lg text-white" to="/Map" onClick={() => setMenuOpen(false)}>Map</Link>
        <Link className="text-lg text-white" to="/Trip-tgt" onClick={() => setMenuOpen(false)}>Trip-tgt</Link>

        {/* ถ้ายังไม่ login => button Sign In (mobile) */}
        {!currentUser && (
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate('/login');
            }}
            className={`
              flex items-center justify-center 
              px-4 py-2 
              text-white font-bold 
              rounded-full
              transition-all duration-10 ease-in-out
              border-2
              ${scrolled 
                ? 'bg-[#2E965E] border-[#2E965E] hover:bg-[#1A7B41] hover:border-[#1A7B41]' 
                : 'bg-transparent border-white hover:bg-[#2E965E] hover:border-[#2E965E]'
              }
            `}
          >
            Sign In
            <FaSignInAlt className="ml-2" />
          </button>
        )}

        {/* ถ้า login แล้ว => icon user + logout (mobile) */}
        {currentUser && (
          <>
            <div className="flex items-center">
              <FaUserCircle className="text-white text-2xl mr-2" />
              <span>{currentUser.email}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setCurrentUser(null);
                setMenuOpen(false);
                navigate("/");
              }}
              className="px-4 py-2 mt-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-green-600 transition-colors"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
