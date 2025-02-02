import React, { useState, useEffect } from 'react';
import applightWave from '../../../images/applight-wave.svg';
import './banner.css';
import '../../../animation/animate.css';
import SearchBar from '../searchbar';
import Background from '../../../images/back.mp4';

const words = ['Adventure', 'Destination', 'Trip', 'Experience'];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [displayedText, isDeleting, index]);

  return (
    <section className="banner" data-scroll-index="0">
      {/* Background Video */}
      <div className="video-background">
        <video src={Background} autoPlay loop muted />
      </div>

      {/* Banner Text */}
      <div className="banner-text">
        <h1 className="white">Discovery your</h1>
        <h2 className="white">Next <span className="typing-effect">{displayedText}</span></h2>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar />
      </div>

      {/* Bottom Curve */}
      <span className="svg-wave">
        <img className="svg-hero" src={applightWave} alt="Wave" />
      </span>
    </section>
  );
};

export default Banner;
