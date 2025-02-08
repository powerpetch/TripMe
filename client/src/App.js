import React, { useEffect } from 'react';
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
import AuthPage from './components/auth/login';

// Other Components
import Translator from './components/translator/translator';
import Currency from './components/currency/currency';

const HomePage = () => {
  return (
    <>
      <Header isHomePage={true} />
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
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;