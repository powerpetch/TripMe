import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logoGreen from "../../../images/new-logo-green.png";

function OtherHeader({ user, avatarUrl }) {
  const navigate = useNavigate();

  return (
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
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-1 rounded-full transition-colors"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-500 text-2xl" />
            )}
            <span className="text-gray-700 font-medium">
              {user.username}
            </span>
          </button>
        ) : (
          // ถ้าไม่มี user แสดงปุ่ม Login
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 bg-white-600 text-white rounded"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default OtherHeader;
