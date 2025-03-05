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
import MenuBar from './components/homepage/menubar';

// Auth / Map / อื่น ๆ
import AuthPage from './components/auth/login';
import Translator from './components/translator/translator';
import Currency from './components/currency/currency';
import MapPage from './components/map/MapPage';

import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import ChangePasswordPage from './components/profile/ChangePassword';
import MyBlog from './components/profile/MyBlog';

// auth
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';

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
      {/* <MenuBar /> */}
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

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        <Route path="/my-blog" element={<MyBlog />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
