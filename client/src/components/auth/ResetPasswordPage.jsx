import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // read token from URL ?token=xxx
    const token = searchParams.get("token");
    if (token) {
      setResetToken(token);
    } else {
      setMessage("Invalid reset link");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!resetToken) {
      setError("No token provided");
      return;
    }
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successfully. You can now login.");
        setNewPassword("");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Reset Password</h2>

        {message && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Change Password
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
