import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import logoGreen from "../../images/new-logo-green.png";


function ChangePasswordPage() {
  const navigate = useNavigate();

  // Input fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // error handling
  const [error, setError] = useState("");

  // Current user (fetched from /profile)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok && data.user) {
          // Transform avatar URL if it exists
          const userWithFullAvatar = {
            ...data.user,
            avatar: data.user.avatar 
              ? data.user.avatar.startsWith('http') 
                ? data.user.avatar 
                : `http://localhost:5000${data.user.avatar}`
              : null
          };
          setUser(userWithFullAvatar);
        } else {
          throw new Error(data.message || "Could not fetch user");
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    // Check token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Make request to change password
    try {
      const res = await fetch("http://localhost:5000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // alert("Password changed successfully!"); // this line i comment to just for testing
        navigate("/profile");
      } else {
        setError(data.message || "Change password failed.");
      }
    } catch (err) {
      console.error("ChangePassword Error:", err);
      setError("Server error. Please try again later.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // If user not found or not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Please log in to continue.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-16 bg-white shadow px-4 flex items-center justify-between fixed w-full top-0 left-0 z-50">
        {/* Logo + Brand */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoGreen} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* User Info */}
        <nav className="flex items-center space-x-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-500 text-2xl" />
          )}
          <span className="text-gray-700 font-medium">{user.username}</span>
        </nav>
      </header>

      {/* Content */}
      <div className="pt-20 max-w-3xl mx-auto w-full px-4">
        {/* Title */}
        <div className="flex items-center space-x-2 mb-6 mt-2">
          <span
            onClick={() => navigate("/profile")}
            className="text-green-600 text-2xl font-bold cursor-pointer hover:underline"
          >
            My Profile
          </span>
          <span className="text-2xl text-gray-400">{">"}</span>
          <span className="text-2xl font-bold text-gray-700">Change password</span>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder=""
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                * Must be at least 8 characters long.
              </p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
