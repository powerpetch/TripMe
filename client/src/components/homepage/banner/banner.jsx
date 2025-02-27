import React, { useState, useEffect } from 'react';
import applightWave from '../../../images/applight-wave.svg';
import './banner.css';
import '../../../animation/animate.css';
import SearchBar from '../searchbar';
import Background from '../../../images/back.mp4';

import { FaSearch } from "react-icons/fa";

const words = ['Adventure', 'Destination', 'Trip', 'Experience'];


const Banner = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 870);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip animation on mobile
    
    const typingSpeed = isDeleting ? 50 : 100;
    const word = words[index];
    
    if (!isDeleting && displayedText === word) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prevText) =>
        isDeleting ? prevText.slice(0, -1) : word.slice(0, prevText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, index, isMobile]);

  return (
    <section className="banner" data-scroll-index="0">
      {/* Background Video */}
      <div className="video-background">
        <video src={Background} autoPlay loop muted />
      </div>

      {/* Conditional Rendering for Mobile & Desktop */}
      {isMobile ? (
        <div className="mobile-search-bar min-h-screen flex justify-center items-center px-4">
          <div className="w-full max-w-lg bg-white flex items-center rounded-full shadow-md px-4 py-3">
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 transition">
              <FaSearch />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="banner-text hidden md:block">
            <h1 className="white">Discovery your</h1>
            <h2 className="white">Next <span className="typing-effect">{displayedText}</span></h2>
          </div>
          <div className="search-bar-container hidden md:flex">
            <SearchBar />
          </div>
        </>
      )}

      {/* Bottom Curve */}
      <span className="svg-wave">
        <img className="svg-hero" src={applightWave} alt="Wave" />
      </span>
    </section>
  );
};

export default Banner;
