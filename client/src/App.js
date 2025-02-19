import React, { useEffect } from 'react';
import WOW from 'wowjs';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bxslider/dist/jquery.bxslider.min.css';
import 'wowjs/css/libs/animate.css';
import './App.css';

// import ส่วนต่าง ๆ
import Header from './components/homepage/header/header';
import Banner from './components/homepage/banner/banner';
import About from './components/homepage/about/about';
import VideoSection from './components/homepage/video_sec/video_sec';
import Blog from './components/homepage/rec_place/rec_place';
import TravelSection from './components/homepage/travel_sec';
import Testimonial from './components/homepage/testimonial';
import Tips from './components/homepage/tips';
import Footer from './components/homepage/footer/footer';

// Auth / Map / อื่น ๆ
import AuthPage from './components/auth/login';
import Translator from './components/translator/translator';
import Currency from './components/currency/currency';
import MapPage from './components/map/MapPage';

// Trip
import TripDetail from './components/trip/TripDetail';

// เพจใหม่
import TripTogetherPage from './components/trip/TripTogetherPage'; // <-- สร้างไฟล์ไว้ตามตัวอย่างด้านบน

function NotFound() {
  return <div style={{ padding: '2rem' }}>404 - Page Not Found</div>;
}

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
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* เพิ่มเส้นทาง Trip-tgt */}
        <Route path="/Trip-tgt" element={<TripTogetherPage />} />

        {/* ตัวอย่างหน้า TripDetail */}
        <Route path="/trip/:id" element={<TripDetail />} />
        
        {/* หากต้องการ /trip/new หรือ /trip/:id/edit ก็เพิ่มได้ตรงนี้ */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
