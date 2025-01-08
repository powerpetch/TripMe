import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/new-logo.png';
import logoGreen from '../../../images/new-logo-green.png';
import "./header.css";
import LoginPopup from "../../auth/login_pop";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

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
    <>
      <div className={loginPopup ? "blur-sm bg-black/30" : ""}>
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
            <button
              className="navbar-toggler md:hidden"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent">
              <span className="fas fa-bars"></span>
            </button>

            {/* Nav Links */}
            <div
              id="navbarSupportedContent"
              className="hidden md:flex items-center space-x-4">
              <ul className="flex items-center space-x-6">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Translator">Translator</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Currency">Currency</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Map">Map</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Trip-tgt">Trip-tgt</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/faq">FAQ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
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
        </nav>
      </div>

      {/* Login Popup */}
      {loginPopup && <LoginPopup loginPopup={loginPopup} handleLoginPopup={handleLoginPopup} />}
    </>
  );
};

export default Header;