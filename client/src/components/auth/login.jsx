import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaLinkedin, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./background.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="area">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-4xl h-[600px] bg-white/90 shadow-2xl flex overflow-hidden rounded-2xl m-4 backdrop-blur-sm">
          {/* Close Button */}
          <button 
            onClick={() => navigate('/')} 
            className={`absolute top-4 left-4 z-30 transition-colors duration-300
            ${isSignUp 
              ? "text-white hover:text-green-200" 
              : "text-green-600 hover:text-green-800"}`}>
            <FaTimes size={24} />
          </button>

          {/* Left Section - Sign In */}
          <div className={`absolute w-1/2 h-full flex flex-col justify-center p-12 transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isSignUp ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
            <h2 className="text-3xl font-bold text-green-600 mb-6">Welcome Back</h2>
            <div className="flex gap-4 mb-6">
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaFacebook className="text-green-600 text-xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaGoogle className="text-green-600 text-xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaLinkedin className="text-green-600 text-xl" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">or use your email account:</p>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 mb-4 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500"
            />
            <div className="relative w-full mb-4">
              <input
                type={showSignInPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pl-10 pr-10 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowSignInPassword(!showSignInPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl hover:text-green-600"
              >
                {showSignInPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <p className="text-gray-600 mb-6 cursor-pointer hover:text-green-600 transition-colors">
              Forgot your password?
            </p>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              SIGN IN
            </button>
          </div>

          {/* Right Section - Sign Up */}
          <div className={`absolute w-1/2 h-full right-0 flex flex-col justify-center p-12 transition-all duration-700 ease-in-out z-20 bg-white/90
            ${isSignUp ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
            <h2 className="text-3xl font-bold text-green-600 mb-6">Create Account</h2>
            <div className="flex gap-4 mb-6">
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaFacebook className="text-green-600 text-xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaGoogle className="text-green-600 text-xl" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-green-100 hover:border-green-500 transition-colors">
                <FaLinkedin className="text-green-600 text-xl" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">or use your email for registration:</p>
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full p-3 mb-4 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 mb-4 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500"
            />
            <div className="relative w-full mb-4">
              <input
                type={showSignUpPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pl-10 pr-10 border-2 border-green-100 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl hover:text-green-600"
              >
                {showSignUpPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              SIGN UP
            </button>
          </div>

          {/* Sliding Overlay */}
          <div className={`absolute w-1/2 h-full right-0 bg-green-600 text-white flex items-center justify-center transition-all duration-700 ease-in-out
            ${isSignUp ? "-translate-x-full" : "translate-x-0"}`}>
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