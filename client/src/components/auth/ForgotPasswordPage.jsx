import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("A reset link has been sent to your email. Please check your inbox (or spam).");
        setEmail("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Forgot Password</h2>

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
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Send Reset Link
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

export default ForgotPasswordPage;
