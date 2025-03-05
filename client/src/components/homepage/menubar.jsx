import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCurrencyExchange } from "react-icons/md";
import { LuMap } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { BsTranslate } from "react-icons/bs";

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 w-full bg-white p-4 shadow-md flex justify-around items-center md:hidden z-50">
      <button 
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex flex-col items-center"
        onClick={() => navigate("/")}
      >
        <AiOutlineHome size={24} />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex flex-col items-center"
        onClick={() => navigate("/currency")}
      >
        <MdCurrencyExchange size={24} />
        <span className="text-xs mt-1">Currency</span>
      </button>
      
      <button 
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex flex-col items-center"
        onClick={() => navigate("/Translator")}
      >
        <BsTranslate  size={24} />
        <span className="text-xs mt-1">Translate</span>
      </button>

      <button 
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 flex flex-col items-center"
        onClick={() => navigate("/map")}
      >
        <LuMap size={24} />
        <span className="text-xs mt-1">Map</span>
      </button>
    </div>
  );
};

export default MenuBar;