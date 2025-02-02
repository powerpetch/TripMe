import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/new-logo.png';
import logoGreen from '../../../images/new-logo-green.png';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

import { FaSignInAlt } from "react-icons/fa";

import "./header.css";

const Header = ({ handleLoginPopup }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scroll' : ''} transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src={scrolled ? logoGreen : logo}
            alt="Logo"
            className="h-10 transition-transform duration-300"/>
        </Link>

        {/* Toggle Button */}
        <button className={`md:hidden ${scrolled ? 'text-black' : 'text-white'}` } onClick={() => setMenuOpen(!menuOpen)}>
          <AiOutlineMenu size={24} />
        </button>

        {/* Nav Links */}
        <div id="navbarSupportedContent" className="hidden md:flex items-center space-x-4">
          <ul className="flex items-center space-x-6 text-white">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Translator">Translator</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Currency">Currency</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Map">Map</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Trip-tgt">Trip-tgt</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/faq">FAQ</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <button
              onClick={handleLoginPopup}
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
              <i className="ml-2 fas fa-sign-in-alt text-sm"></i>
            </button>
          </ul>
        </div>
      </div>

      
      {menuOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden"
        onClick={() => setMenuOpen(false)}/>
      )}

      {/* Mobile Menu (Slide-in from Right) */}
      <div className={`fixed top-0 right-0 w-3/4 h-full bg-black text-white shadow-lg p-6 flex flex-col space-y-6 transition-transform duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
          <AiOutlineClose size={24} />
        </button>
        
        {/* Search Bar */}
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
        <Link className="text-lg text-white" to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
        <Link className="text-lg text-white" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <button
              onClick={handleLoginPopup}
              className={`
                flex items-center justify-center 
                px-4 py-2 
                text-white font-bold 
                rounded-full
                transition-all duration-10 ease-in-out
                border-2
                transform hover:-translate-y-0.5
                ${scrolled 
                  ? 'bg-[#2E965E] border-[#2E965E] hover:bg-[#1A7B41] hover:border-[#1A7B41]' 
                  : 'bg-transparent border-white hover:bg-[#2E965E] hover:border-[#2E965E]'
                }
              `}>
              Sign In
              <i className="ml-2 fas fa-sign-in-alt text-sm"></i>
            </button>
      </div>
    </nav>
  );
};

export default Header;
