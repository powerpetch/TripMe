import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import logoGreen from "../../images/new-logo-green.png";
import { COUNTRY_CODES, COUNTRIES, DAYS, MONTHS, YEARS, LANGUAGES } from "../../js/mockData";

function EditProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Modal ลิงก์ Social
  const [showSocialModal, setShowSocialModal] = useState(false);

  // file refs
  const coverInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // user fields
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("N/A");
  const [countryCode, setCountryCode] = useState("+66");
  const [tel, setTel] = useState("");
  const [language, setLanguage] = useState("English");
  const [dobDay, setDobDay] = useState("1");
  const [dobMonth, setDobMonth] = useState("1");
  const [dobYear, setDobYear] = useState("1990");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}`;

  const avatarURL = user && user.avatar ? `${baseUrl}${user.avatar}` : null;
  const coverURL = user && user.cover ? `${baseUrl}${user.cover}` : null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);

          if (data.user.cover) {
            setCoverPreview(`${baseUrl}${data.user.cover}`);
          }
          if (data.user.avatar) {
            setAvatarPreview(`${baseUrl}${data.user.avatar}`);
          }

          setUsername(data.user.username || "");
          setFirstName(data.user.firstName || "");
          setLastName(data.user.lastName || "");
          setGender(data.user.gender || "N/A");

          if (data.user.tel) {
            const found = COUNTRY_CODES.find((c) =>
              data.user.tel.startsWith(c.value)
            );
            if (found) {
              setCountryCode(found.value);
              const digits = data.user.tel.slice(found.value.length);
              setTel(digits.replace(/\D/g, ""));
            } else {
              setCountryCode("");
              setTel(data.user.tel.replace(/\D/g, ""));
            }
          } else {
            setTel("");
            setCountryCode("");
          }

          setLanguage(data.user.language || "");

          if (data.user.dob) {
            const [d, m, y] = data.user.dob.split("/");
            setDobDay(d || "");
            setDobMonth(m || "");
            setDobYear(y || "");
          }

          setTwitter(data.user.twitter || "");
          setFacebook(data.user.facebook || "");
          setInstagram(data.user.instagram || "");
          setCountry(data.user.country || "");
          setCity(data.user.city || "");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const actualSave = () => {
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
    formData.append("country", country);
    formData.append("city", city);

    if (coverFile) {
      formData.append("cover", coverFile);
    }
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/update`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/profile";
        } else {
          console.log("Update failed:", data.message);
        }
      })
      .catch((err) => console.error(err));
  };

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

  const handleTelChange = (e) => {
    const val = e.target.value;
    const onlyDigits = val.replace(/\D/g, "");
    setTel(onlyDigits);
  };

  const handleSave = () => {
    // ถ้ามีกรอก social link => ยืนยัน
    if (twitter || facebook || instagram) {
      setShowSocialModal(true);
    } else {
      actualSave();
    }
  };

  const handleSocialModalConfirm = () => {
    setShowSocialModal(false);
    actualSave();
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">
          No user found. Please Sign In first.
        </p>
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
          <span className="text-2xl font-bold text-gray-700">
            Edit Profile
          </span>
        </div>

        {/* Save/Cancel */}
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

        {/* Cover + Avatar */}
        <div className="bg-white rounded shadow p-4 mb-6 relative">
          {/* Cover */}
          <div className="relative w-full h-52 bg-gray-200 overflow-hidden rounded-lg">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="cover preview"
                className="object-cover w-full h-full"
              />
            ) : coverURL ? (
              <img
                src={coverURL}
                alt="cover"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-gray-500 flex items-center justify-center h-full text-lg">
                No Cover
              </div>
            )}

            {/* camera icon */}
            <div
              className="absolute top-3 right-3 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 shadow"
              onClick={() => coverInputRef.current.click()}
            >
              <FaCamera className="text-gray-600" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverChange}
              className="hidden"
            />
          </div>

          {/* Avatar */}
          <div className="flex items-center px-4 mt-[-48px] relative z-10">
            <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="object-cover w-full h-full"
                />
              ) : avatarURL ? (
                <img
                  src={avatarURL}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="absolute top-[-5px] left-[-8px]">
                  <FaUserCircle className="text-gray-400 text-[120px]" />
                </div>
              )}
              <div
                className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 shadow "
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

        {/* Form */}
        <div className="bg-white rounded shadow p-6">
          {/* grid => responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Username
              </label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Gender
              </label>
              <select
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">Other</option>
              </select>
            </div>

            {/* Tel */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Tel
              </label>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300 mb-2 md:mb-0 md:w-40"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
                  value={tel}
                  onChange={handleTelChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Language
              </label>
              <select
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Date of Birth
              </label>
              <div className="flex space-x-2">
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobDay}
                  onChange={(e) => setDobDay(e.target.value)}
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobMonth}
                  onChange={(e) => setDobMonth(e.target.value)}
                >
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <select
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={dobYear}
                  onChange={(e) => setDobYear(e.target.value)}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Country
              </label>
              <select
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                City
              </label>
              <input
                type="text"
                className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Twitter
              </label>
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
              <label className="block text-gray-700 mb-1 font-medium">
                Facebook
              </label>
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
              <label className="block text-gray-700 mb-1 font-medium">
                Instagram
              </label>
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

      {/* Modal สำหรับลิงก์ social */}
      {showSocialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-2">Please Accept the Terms</h3>
            <p className="mb-4">
              Please verify that the links you provided are your own and the
              information is correct.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSocialModal(false)}
                className="mr-2 px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSocialModalConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfilePage;
