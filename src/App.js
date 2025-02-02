import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bxslider/dist/jquery.bxslider.min.css';
import 'wowjs/css/libs/animate.css';
import './App.css';

import { Routes, Route } from 'react-router-dom';

// Homepage Components
import Header from './components/homepage/header/header';
import Banner from './components/homepage/banner/banner';
import About from './components/homepage/about/about';
import VideoSection from './components/homepage/video_sec/video_sec';
import Blog from './components/homepage/rec_place/rec_place';
import Tips from './components/homepage/tips';
import Footer from './components/homepage/footer/footer';
import Testimonial from './components/homepage/testimonial';
import TravelSection from './components/homepage/travel_sec';
import Login from './components/auth/login';

// Translator Component
import Translator from './components/translator/translator';

const HomePage = ({ handleLoginOpen }) => {
  return (
    <>
      <Header handleLoginPopup={handleLoginOpen} isHomePage={true} />
      <Banner />
      <About />
      <VideoSection />
      <Blog />
      <TravelSection />
      <Testimonial />
      <Tips />
      <Footer />
    </>
  );
};

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignIn = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="relative">
      <div className={isLoginOpen ? "blur-sm" : ""}>
        <Routes>
          <Route path="/" element={<HomePage handleLoginOpen={handleLoginOpen} />} />
          <Route path="/translator" element={<Translator />} />
        </Routes>
      </div>

      <Login 
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        handleSignIn={handleSignIn}
      />
    </div>
  );
}

export default App;