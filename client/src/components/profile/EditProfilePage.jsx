// src/pages/EditProfilePage.jsx

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import logoGreen from "../../images/new-logo-green.png";

// Mock Country Code (ตัวอย่าง)
const COUNTRY_CODES = [
  { label: "+66 (Thailand)", value: "+66" },
  { label: "+1 (USA)", value: "+1" },
  { label: "+44 (UK)", value: "+44" },
  { label: "+81 (Japan)", value: "+81" },
  { label: "+86 (China)", value: "+86" },
  { label: "+91 (India)", value: "+91" },
  { label: "+61 (Australia)", value: "+61" },
  { label: "+49 (Germany)", value: "+49" },
  // ... เพิ่มได้ตามต้องการ
];

// Mock Days (1–31)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// Mock Months (1–12)
const MONTHS = [
  { label: "Jan", value: "1" },
  { label: "Feb", value: "2" },
  { label: "Mar", value: "3" },
  { label: "Apr", value: "4" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Jul", value: "7" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
];

// Mock Years (1960–ปัจจุบัน)
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [];
for (let y = 1960; y <= CURRENT_YEAR; y++) {
  YEARS.push(y);
}

function EditProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ---------- State เกี่ยวกับ Cover / Avatar ----------
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // ref สำหรับ input file (ซ่อน)
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // ---------- ฟิลด์อื่น ๆ ----------
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("N/A");

  // Tel + Country code
  const [countryCode, setCountryCode] = useState("+66");
  const [tel, setTel] = useState(""); // รับเฉพาะตัวเลข

  // Language
  const [language, setLanguage] = useState("English");

  // Date of Birth
  const [dobDay, setDobDay] = useState("1");
  const [dobMonth, setDobMonth] = useState("1");
  const [dobYear, setDobYear] = useState("1990");

  // Social
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  // โหลดข้อมูล User จาก Backend (mock)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/user/profile", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);

          // ถ้ามี cover / avatar ใน DB => แสดง preview
          if (data.user.cover) {
            setCoverPreview(data.user.cover);
          }
          if (data.user.avatar) {
            setAvatarPreview(data.user.avatar);
          }

          // Set ฟิลด์อื่น ๆ
          setUsername(data.user.username || "");
          setFirstName(data.user.firstName || "");
          setLastName(data.user.lastName || "");
          setGender(data.user.gender || "N/A");

          // สมมติ data.user.tel => "+66xxxx"
          // ตัดเครื่องหมายทั้งหมด => setTel
          setTel(data.user.tel?.replace(/\D/g, "") || "");

          setLanguage(data.user.language || "");

          // ถ้า DB เก็บ dob เป็น "day/month/year"
          // สมมติ data.user.dob = "5/7/1985"
          if (data.user.dob) {
            const [d, m, y] = data.user.dob.split("/");
            setDobDay(d || "");
            setDobMonth(m || "");
            setDobYear(y || "");
          }

          setTwitter(data.user.twitter || "");
          setFacebook(data.user.facebook || "");
          setInstagram(data.user.instagram || "");
        }
      })
      .catch(err => console.error(err));
  }, []);

  // --------- Handle Cover Change ---------
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // --------- Handle Avatar Change ---------
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // --------- Tel: รับเฉพาะตัวเลข ---------
  const handleTelChange = (e) => {
    const val = e.target.value;
    const onlyDigits = val.replace(/\D/g, "");
    setTel(onlyDigits);
  };

  // --------- บันทึก ---------
  const handleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("gender", gender);
    formData.append("tel", countryCode + tel);
    formData.append("language", language);
    formData.append("dob", `${dobDay}/${dobMonth}/${dobYear}`);
    formData.append("twitter", twitter);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);

    // ถ้ามีอัปโหลด cover
    if (coverFile) {
      formData.append("cover", coverFile);
    }
    // ถ้ามีอัปโหลด avatar
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    fetch("http://localhost:5000/api/user/update", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
			console.log("Updated user:", data.user);
			window.location.href = "/profile";
        }
		else {
			console.log("Update failed:", data.message);
		}
      })
      .catch(err => console.error(err));
  };

  // --------- Cancel ---------
  const handleCancel = () => {
    navigate("/profile");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">No user found. Please Sign In first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <header className="h-16 bg-white shadow px-4 flex items-center justify-between fixed w-full top-0 left-0 z-50">
        <div className="flex items-center">
          <img
            src={logoGreen}
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex items-center space-x-4">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-500 text-2xl" />
          )}
          <span className="text-gray-700 font-medium">{user.username}</span>
        </nav>
      </header>

      <div className="pt-20 max-w-5xl mx-auto w-full px-4">
        {/* Title */}
        <div className="flex items-center space-x-2 mb-6">
          <span
            onClick={() => navigate("/profile")}
            className="text-green-600 text-2xl font-bold cursor-pointer hover:underline"
          >
            My Profile
          </span>
          <span className="text-2xl text-gray-400">{">"}</span>
          <span className="text-2xl font-bold text-gray-700">Edit Profile</span>
        </div>

        {/* ปุ่ม Save/Cancel */}
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-200 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>

        {/* Cover + Avatar layout (ซ้อนกัน) */}
        <div className="bg-white rounded shadow p-4 mb-6 relative">
          {/* Cover */}
          <div className="relative w-full h-52 bg-gray-200 overflow-hidden rounded-lg">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="cover preview"
                className="object-cover w-full h-full"
              />
            ) : user.cover ? (
              <img
                src={user.cover}
                alt="cover"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-gray-500 flex items-center justify-center h-full text-lg">
                No Cover
              </div>
            )}

            {/* ไอคอนกล้องบน cover */}
            <div
              className="absolute top-3 right-3 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 shadow"
              onClick={() => coverInputRef.current.click()}
            >
              <FaCamera className="text-gray-600" />
            </div>
            {/* hidden input cover */}
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverChange}
              className="hidden"
            />
          </div>

          {/* Avatar (ซ้อนทับขอบล่าง cover) */}
          <div className="flex items-center px-4 mt-[-48px] relative z-10">
            <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="object-cover w-full h-full"
                />
              ) : user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-[90px]" />
              )}
              {/* ไอคอนกล้องบน avatar */}
              <div
                className="absolute bottom-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-gray-100 shadow"
                onClick={() => avatarInputRef.current.click()}
              >
                <FaCamera className="text-gray-600" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="ml-4 mt-10">
              <p className="text-sm text-gray-500">Change Profile Picture</p>
            </div>
          </div>
        </div>

        {/* ฟอร์มข้อมูล */}
        <div className="bg-white rounded shadow p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Username</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">First Name</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Gender</label>
              <select
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">N/A</option>
              </select>
            </div>

            {/* Tel + Country Code */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Tel</label>
              <div className="flex space-x-2">
                <select
                  className="border p-2 rounded w-28 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={tel}
                  onChange={handleTelChange}
                  placeholder=""
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Language</label>
              <select
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Thai">Thai</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
                <option value="French">French</option>
                {/* ... เพิ่มได้ตามต้องการ */}
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Date of Birth</label>
              <div className="flex space-x-2">
                {/* Day */}
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value)}
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {/* Month */}
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value)}
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {/* Year */}
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value)}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Twitter</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
            {/* Facebook */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Facebook</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                placeholder="https://facebook.com/username"
              />
            </div>
            {/* Instagram */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Instagram</label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
