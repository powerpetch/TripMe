import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaUserAlt, FaUsers, FaCog, FaVideo, FaBookOpen, FaSignOutAlt,
  FaFacebook, FaTwitter, FaInstagram  // นำเข้าไอคอน social
} from "react-icons/fa";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";

import logoGreen from '../../images/new-logo-green.png';
import coverimg from '../../images/phd.jpg';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const baseUrl = "http://localhost:5000";
  // const [avatarPreview, setAvatarPreview] = useState(null);
  // const [userID, setUserID] = useState(null);
  // const [phone, setPhone] = useState(null);
  // const [gender, setGender] = useState(null);
  // const [language, setLanguage] = useState(null);
  // const [country, setCountry] = useState(null);
  // const [city, setCity] = useState(null);
  // const [birthDate, setBirthDate] = useState(null);
  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    fetch("http://localhost:5000/api/user/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setUser(data.user);
      } else {
        console.log("No valid user, please log in again");
      }
    })
    .catch(err => console.error(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">No user found. Please Sign In first.</p>
      </div>
    );
  }

  const avatarUrl = user.avatar ? (user.avatar.startsWith("http") ? user.avatar : baseUrl + user.avatar) : null;
  const coverUrl = user.cover ? (user.cover.startsWith("http") ? user.cover : baseUrl + user.cover) : coverimg;

  // ถ้า user ไม่มี avatar => icon แทน
  const avatar = user.avatar || null;
  // ถ้า user ไม่มี cover => placeholder
  const coverImage = user.cover || coverimg;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 bg-white shadow px-4 flex items-center justify-between fixed w-full top-0 left-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img 
            src={logoGreen}
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* User icon  */}
        <nav className="flex items-center space-x-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-500 text-2xl" />
          )}
          <span className="text-gray-700 font-medium">{user.username}</span>
        </nav>
      </header>

      {/* เนื้อหาหลัก */}
      <div className="pt-20 max-w-7xl mx-auto w-full px-4">
        
        <div className="text-2xl font-bold text-gray-800 mb-4">
          My Profile
        </div>

        <div className="flex gap-4">
          
          {/* Sidebar */}
          <div className="flex flex-col w-64 space-y-4">
            <div className="bg-gray rounded shadow p-4 flex flex-col space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase">Personal</h3>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <FaUserAlt />
                <span>Profile</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <FaUsers />
                <span>Friends</span>
              </button>
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                onClick={() => navigate('/edit-profile')}>
                <FaCog />
                <span>Edit Profile</span>
              </button>
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                onClick={() => navigate('/change-password')}>
                <FaUnlock />
                <span>Change password</span>
              </button>
            </div>
            <div className="bg-gray rounded shadow p-4 flex flex-col space-y-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <MdAddBox />
                <span>Post</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <FaBookOpen />
                <span>Blog</span>
              </button>
              <hr />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="flex items-center space-x-2 text-red-500 hover:text-red-700"
              >
                <FaSignOutAlt />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Profile info */}
          <div className="flex-1 mb-8 bg-white rounded shadow p-4 relative">
            
            {/* Cover */}
            
            <div className="relative w-full h-48 bg-gray-300 overflow-hidden rounded-md">
              <img
                src={coverUrl}
                alt="Cover"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Avatar */}
            <div className="flex items-center space-x-6 px-4 mt-[-20px] relative z-10"> 
              
              {avatar ? (
                <div className="w-32 h-32 bg-gray-200 overflow-hidden rounded-full border- border-white">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <FaUserCircle className="text-gray-400 text-[110px] border-10 border-white rounded-full" />
              )}

              <div className="mt-8 flex flex-col">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-gray-700">
                    {user.username || "No Name"}
                  </h2>
                  {/* แสดงไอคอน social ถ้ามีลิงก์ */}
                  {user.twitter && (
                    <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="text-blue-500" />
                    </a>
                  )}
                  {user.facebook && (
                    <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="text-blue-700" />
                    </a>
                  )}
                  {user.instagram && (
                    <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="text-pink-500" />
                    </a>
                  )}
                </div>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-400">
                  {user.city || "Unknown City"}, {user.country || "Unknown Country"}
                </p>
              </div>
            </div>

            {/* ตารางข้อมูล */}
            <div className="mt-8 px-10">
              <div className="flex items-center justify-between py-2">
                <div className="text-gray-600 font-semibold">User ID</div>
                <div className="text-gray-700">{user._id}</div>
              </div>
              <hr />
              <div className="flex items-center justify-between py-2">
                <div className="text-gray-600 font-semibold">Email</div>
                <div className="text-gray-700">{user.email}</div>
              </div>
              <hr />
              <div className="flex items-center justify-between py-2">
                <div className="text-gray-600 font-semibold">Phone</div>
                <div className="text-gray-700">{user.tel || "Not provided"}</div>
              </div>
              <hr />
              <div className="flex items-center justify-between py-2">
                <div className="text-gray-600 font-semibold">Gender</div>
                <div className="text-gray-700">{user.gender || "N/A"}</div>
              </div>
              <hr />
              <div className="flex items-center justify-between py-2">
                <div className="text-gray-600 font-semibold">Language</div>
                <div className="text-gray-700">{user.language}</div>
              </div>
              <hr />
              <div className="flex items-center justify-between py-2">
                  <div className="text-gray-600 font-semibold">Date of birth</div>
                  <div className="text-gray-700">{user.dob || "N/A"}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
