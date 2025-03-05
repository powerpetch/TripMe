import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin, FaTimes } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./background.css";
import "./animations.css";

const AuthPage = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

  // Sign In
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Errors
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  // OTP steps
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // -------------- Request OTP --------------
  const handleRequestOtp = async () => {
    setIsEmailError(false);
    setSignUpError("");

    // เบื้องต้น เช็คอีเมล + password + name
    if (!signUpEmail || signUpName.length < 3 || signUpPassword.length < 8) {
      setSignUpError("Please fill all fields correctly before requesting OTP.");
      return;
    }

    try {
      // ใช้ /signup ในการสร้าง user + ส่ง OTP
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpName,
          email: signUpEmail,
          password: signUpPassword
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOtpSent(true);
        setSignUpError("");
        // alert("OTP has been sent. Please check your email.");
      } else {
        setSignUpError(data.message || "Failed to request OTP");
      }
    } catch (err) {
      console.error(err);
      setSignUpError("Server error requesting OTP");
    }
  };

  // -------------- Verify OTP --------------
  const handleVerifyOtp = async () => {
    if (!signUpEmail || !otp) {
      setSignUpError("Please input your Email and OTP");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signUpEmail, otp })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // สำเร็จ => OTP ถูกต้อง => verifiedEmail = true
        setIsOtpVerified(true);
        // alert("Email verified. Now you can sign in or use your account");
      } else {
        setSignUpError(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setSignUpError("Error verifying OTP");
    }
  };

  // -------------- Sign Up (final) --------------
  // ในที่นี้ ถ้า OTP ยังไม่ verify => ไม่ให้ sign up
  // แต่จริงๆ user ถูกสร้างใน DB แล้ว => signUp = "finish"
  // (หรือจะไม่ต้องมีปุ่มนี้ก็ได้ ถ้า verify OTP = sign up สำเร็จ)
  const handleSignUpFinal = () => {
    if (!isOtpVerified) {
      setSignUpError("Please verify OTP first.");
      return;
    }
    // ถ้า otpVerified = true => แปลว่า user ใช้อีเมล + pass + OTP สำเร็จ => เข้า sign in ได้เลย
    // alert("Your email is verified. You can now Sign In.");
    setIsSignUp(false); // กลับไปหน้า sign in
  };

  // -------------- Sign In --------------
  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("loginTime", Date.now().toString());
        navigate("/");
      } else {
        setIsEmailError(true);
        setIsPasswordError(true);
        // alert(data.message || "Sign In Error");
      }
    } catch (err) {
      console.error(err);
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  };

  return (
    <div className="area">
      <ul className="circles">
        <li></li><li></li><li></li><li></li><li></li>
        <li></li><li></li><li></li><li></li><li></li>
      </ul>

      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-4xl h-[600px] bg-white/90 shadow-2xl flex overflow-hidden rounded-2xl m-4 backdrop-blur-sm">

          {/* ปุ่มปิด */}
          <button
            onClick={() => navigate("/")}
            className={`
              absolute top-4 left-4 z-30 transition-colors duration-300
              ${isSignUp ? "text-white hover:text-green-200" : "text-green-600 hover:text-green-800"}
            `}
          >
            <FaTimes size={24} />
          </button>

          {/* Left Section - Sign In */}
          <div className={`
            absolute w-1/2 h-full flex flex-col justify-center p-12
            transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isSignUp ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
          `}>
            <h2 className="text-3xl font-bold text-green-600 mb-6">Welcome Back</h2>
            <input
              type="email"
              placeholder="Email"
              className={`
                w-full p-3 mb-4 border-2 rounded-lg focus:outline-none transition-colors
                ${isEmailError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
              `}
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <div className="relative w-full mb-4">
              <input
                type={showSignInPassword ? "text" : "password"}
                placeholder="Password"
                className={`
                  w-full p-3 pl-10 pr-10 border-2 rounded-lg focus:outline-none transition-colors
                  ${isPasswordError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
                `}
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowSignInPassword(!showSignInPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl hover:text-green-600"
              >
                {showSignInPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <p
              onClick={() => navigate("/forgot-password")}
              className="text-gray-600 mb-6 cursor-pointer hover:text-green-600 transition-colors"
            >
              Forgot your password?
            </p>

            <button
              onClick={handleSignIn}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              SIGN IN
            </button>
          </div>

          {/* Right Section - Sign Up */}
          <div className={`
            absolute w-1/2 h-full right-0 flex flex-col justify-center p-12
            transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isSignUp ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          `}>
            <h2 className="text-3xl font-bold text-green-600 mb-6">Create Account</h2>
            
            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              className={`
                w-full p-3 mb-3 border-2 rounded-lg focus:outline-none transition-colors
                ${isEmailError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
              `}
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
            />

            {/* Email + Button Get OTP */}
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="email"
                placeholder="Email"
                className={`
                  flex-1 p-3 border-2 rounded-lg focus:outline-none transition-colors
                  ${isEmailError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
                `}
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <button
                onClick={handleRequestOtp}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Get OTP
              </button>
            </div>

            {/* ถ้า OTP ถูกส่งแล้ว => โชว์ช่องกรอก OTP */}
            {isOtpSent && (
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="OTP"
                  className="p-3 border-2 rounded-lg flex-1"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Verify
                </button>
              </div>
            )}

            {/* Password */}
            <div className="relative w-full mb-2">
              <input
                type={showSignUpPassword ? "text" : "password"}
                placeholder="Password"
                className={`
                  w-full p-3 border-2 rounded-lg focus:outline-none transition-colors
                  ${isPasswordError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
                `}
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl hover:text-green-600"
              >
                {showSignUpPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <p className="text-gray-500 text-[10px] mb-4">
              Password must be at least 8 characters long with no spaces
            </p>
            
            {/* ปุ่ม Sign Up -> ต้องให้ OTP verify ก่อนถึงจะผ่าน */}
            <button
              onClick={() => {
                if (!isOtpVerified) {
                  setSignUpError("Please verify OTP first.");
                  return;
                }
                // alert("Your email is verified. You can now sign in.");
                setIsSignUp(false);
              }}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold mb-3"
            >
              SIGN UP
            </button>

            {signUpError && (
              <div className="text-red-500 text-xs">
                {signUpError}
              </div>
            )}
          </div>

          {/* Sliding Overlay */}
          <div className={`
            absolute w-1/2 h-full right-0 bg-green-600 text-white flex items-center justify-center
            transition-all duration-700 ease-in-out
            ${isSignUp ? "-translate-x-full" : "translate-x-0"}
          `}>
            <div className="px-12 text-center">
              {isSignUp ? (
                <>
                  <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                  <p className="text-green-100 mb-6">
                    To keep connected with us, please login <br/>
                    with your personal info
                  </p>
                  <button 
                    onClick={() => setIsSignUp(false)}
                    className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-semibold"
                  >
                    SIGN IN
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                  <p className="text-green-100 mb-7">
                    Enter your personal details and start <br/>
                    journey with us
                  </p>
                  <button 
                    onClick={() => setIsSignUp(true)}
                    className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-green-600 transition-colors font-semibold"
                  >
                    SIGN UP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
