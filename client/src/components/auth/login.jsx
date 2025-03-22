import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "./background.css";
import "./animations.css";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  // For mobile responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Check for mobile screen size on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // -------------- Request OTP --------------
  const handleRequestOtp = async () => {
    setIsEmailError(false);
    setSignUpError("");

    // เบื้องต้น เช็คอีเมล + password + name
    if (!signUpEmail || signUpName.length < 3 || signUpPassword.length < 8) {
      setSignUpError("Please fill all fields correctly before requesting OTP.");
      return;
    }

    toast.info("Sending OTP to your email. Please check your inbox.");

    try {
      // ใช้ /signup ในการสร้าง user + ส่ง OTP
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, {
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
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-email-otp`, {
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
  const handleSignUpFinal = () => {
    if (!isOtpVerified) {
      setSignUpError("Please verify OTP first.");
      return;
    }
    setIsSignUp(false); // กลับไปหน้า sign in
  };

  // -------------- Sign In --------------
  const handleSignIn = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signin`, {
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

        document.cookie = "data.token=" + data.token + "; path=/; domain=localhost";

        navigate("/");
        window.location.reload();
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

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative w-full ${isMobile ? 'max-w-md' : 'max-w-4xl'} ${isMobile ? 'h-auto py-10' : 'h-[600px]'} bg-white/90 shadow-2xl flex overflow-hidden rounded-2xl backdrop-blur-sm`}>
          {/* ปุ่มปิด */}
          <button
            onClick={() => navigate("/")}
            className={`
              absolute top-4 left-4 z-30 transition-colors duration-300
              ${isSignUp && !isMobile ? "text-white hover:text-green-200" : "text-green-600 hover:text-green-800"}
            `}
          >
            <FaTimes size={24} />
          </button>

          {/* Mobile Toggle Button */}
          {isMobile && (
            <div className="absolute top-4 right-4 z-30">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="px-4 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          )}

          {/* Left Section - Sign In */}
          <div className={`
            ${isMobile ? 'relative w-full' : 'absolute w-1/2'} h-full flex flex-col justify-center p-6 md:p-12
            transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isMobile 
              ? (isSignUp ? 'hidden' : 'block') 
              : (isSignUp ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100')
            }
          `}>
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">Welcome Back</h2>
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
                  w-full p-3 pr-10 border-2 rounded-lg focus:outline-none transition-colors
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
            ${isMobile ? 'relative w-full' : 'absolute w-1/2 right-0'} h-full flex flex-col justify-center p-6 md:p-12
            transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isMobile 
              ? (isSignUp ? 'block' : 'hidden') 
              : (isSignUp ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0')
            }
          `}>
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">Create Account</h2>
            
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
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-3">
              <input
                type="email"
                placeholder="Email"
                className={`
                  w-full p-3 border-2 rounded-lg focus:outline-none transition-colors mb-2 md:mb-0
                  ${isEmailError ? 'error-input shake' : 'border-green-100 focus:border-green-500'}
                `}
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <button
                onClick={handleRequestOtp}
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
              >
                Get OTP
              </button>
            </div>

            {/* ถ้า OTP ถูกส่งแล้ว => โชว์ช่องกรอก OTP */}
            {isOtpSent && (
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="OTP"
                  className="p-3 border-2 rounded-lg w-full mb-2 md:mb-0"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full md:w-auto"
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

          {/* Sliding Overlay - Only show on desktop */}
          {!isMobile && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;