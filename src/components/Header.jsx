import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/new-logo.png';
import logoGreen from '../images/new-logo-green.png';
import '../App.css';   

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${scrolled ? 'nav-scroll' : ''}`}>
      <div className="container position-relative">
        <Link className="navbar-brand navbar-logo" to="/">
          <img src={scrolled ? logoGreen : logo} alt="logo" className="logo-1" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fas fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
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
          </ul>
        </div>
        <button className={`sign-in-button ${scrolled ? 'scrolled' : ''}`}>
          Sign In
          <i className="fas fa-sign-in-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;