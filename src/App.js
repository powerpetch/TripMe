import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bxslider/dist/jquery.bxslider.min.css';
import 'wowjs/css/libs/animate.css';
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/homepage/header/header';
import Banner from './components/homepage/banner/banner';
import About from './components/homepage/about/about';
import VideoSection from './components/homepage/video_sec/video_sec';
import Features from './components/homepage/feature/features';
import Popular from './components/homepage/popular';
import Blog from './components/homepage/rec_place/rec_place';
import Tips from './components/homepage/tips';
import Footer from './components/homepage/footer/footer';
import Testimonial from './components/homepage/testimonial';

import TravelSection from './components/homepage/travel_sec';

import LoginPopup from './components/auth/login_pop';

function App() {
  const [loginPopup, setLoginPopup] = useState(false);
  
  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="relative">
      <div className={loginPopup ? "blur-sm" : ""}>
        <Header handleLoginPopup={handleLoginPopup} />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <About />
              <VideoSection />
              <Blog />
              {/* <Features /> */}
              {/* <Popular /> */}
              <TravelSection />
              <Testimonial />
              <Tips />
            </>
          } />
        </Routes>
        <Footer />
      </div>

      {loginPopup && (
        <div className="fixed inset-0 bg-black/30 z-40">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <LoginPopup loginPopup={loginPopup} handleLoginPopup={handleLoginPopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;