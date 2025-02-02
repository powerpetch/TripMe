import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter, FaTimes } from "react-icons/fa";
import Back from "../../images/bol.jpg";

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 p-4" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-2xl flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800">Log In</h2>
          <p className="text-gray-500 mb-6">to your account</p>
          
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <button className="w-full bg-yellow-500 text-white py-3 rounded-md font-semibold hover:bg-yellow-600">
            LOG IN
          </button>
          <p className="text-sm text-gray-500 text-center mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </div>
        
        {/* Right Side - Social Login */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center bg-cover bg-center rounded-b-2xl md:rounded-r-2xl md:rounded-b-none" 
             style={{ backgroundImage: `url(${Back})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-b-2xl md:rounded-r-2xl"></div>
          <div className="relative text-white text-center z-10 p-6">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="mb-6">with one of your social profiles</p>
            <div className="flex space-x-4">
              <button className="p-3 bg-white rounded-full text-blue-400 hover:bg-gray-200">
                <FaTwitter />
              </button>
              <button className="p-3 bg-white rounded-full text-blue-600 hover:bg-gray-200">
                <FaFacebook />
              </button>
              <button className="p-3 bg-white rounded-full text-red-500 hover:bg-gray-200">
                <FaGoogle />
              </button>
            </div>
            <p className="mt-6 text-sm">Don't have an account?</p>
            <p className="text-sm font-semibold cursor-pointer hover:underline">Register</p>
          </div>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full text-gray-800 text-xl hover:bg-gray-300 transition-colors duration-200"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
