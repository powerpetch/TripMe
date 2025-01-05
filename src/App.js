import React, { useEffect } from 'react';
import WOW from 'wowjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bxslider/dist/jquery.bxslider.min.css';
import 'wowjs/css/libs/animate.css';
import './App.css';

import Header from './components/header';
import Banner from './components/banner';
import About from './components/about';
import VideoSection from './components/video_sec';
import Features from './components/features';
import Popular from './components/popular';
import Blog from './components/blog';
import Tips from './components/tips';
import Footer from './components/footer';
import Testimonial from './components/testimonial';

function App() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="App">
      <Header />
      <Banner />
      <About />
      <VideoSection />
      <Features />
      <Popular />
      <Blog />
      {/* <Testimonial /> */}
      <Tips />
      <Footer />
    </div>
  );
}

export default App;