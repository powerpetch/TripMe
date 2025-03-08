import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bxslider/dist/jquery.bxslider.min.css';
import 'wowjs/css/libs/animate.css';
import './App.css';

// import homepage components
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

// Auth / Map / 
import AuthPage from './components/auth/login';
import Translator from './components/translator/translator';
import Currency from './components/currency/currency';
import MapPage from './components/map/MapPage';

import CreateTrip from './components/tripDetail/CreateTrip'
// import Trip from './components/tripDetail/Trip'
import TripDetails from './components/tripDetail/TripDetailShow.jsx';

import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import ChangePasswordPage from './components/profile/ChangePassword';
import MyBlog from './components/profile/MyBlog';

import PublicProfilePage from './components/profile/PublicProfilePage';

import TripTGTPage from "./components/TripTGT/TripTGTPage";
import NoUserFound from "./components/TripTGT/NoUserFound";

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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // ยังไม่ได้ล็อกอิน

    // เรียก API หา user
    fetch("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.error("Fetch user error:", err));
  }, []);

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
        <Route path="/create" element={<CreateTrip />} />
        {/* <Route path="/trip" element={<Trip />} /> */}
        <Route path="/trip/:id" element={<TripDetails />} />



        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        <Route path="/users/:username" element={<PublicProfilePage />} />
        <Route path="/my-blog" element={<MyBlog />} />

        <Route
          path="/trip-tgt"
          element={
            currentUser ? <TripTGTPage /> : <NoUserFound />
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
