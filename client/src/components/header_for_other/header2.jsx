import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoGreen from '../../images/new-logo-green.png';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";
import { LuMap } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";

const Header2 = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Desktop Header Bar */}
            <div className="hidden md:block w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                            <img src={logoGreen} alt="Logo" className="h-12" />
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <button className="text-gray-700 hover:text-green-600" onClick={() => navigate("/")}>Home</button>
                            <button className="text-gray-700 hover:text-green-600" onClick={() => navigate("/translator")}>Translator</button>
                            <button className="text-gray-700 hover:text-green-600" onClick={() => navigate("/currency")}>Currency</button>
                            <button className="text-gray-700 hover:text-green-600" onClick={() => navigate("/map")}>Map</button>
                            <button className="text-gray-700 hover:text-green-600" onClick={() => navigate("/trip-tgt")}>Trip-tgt</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="w-full flex md:hidden items-center justify-between bg-white p-4 shadow-md fixed top-0 left-0 z-50">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <img src={logoGreen} alt="Logo" className="h-10 transition-transform duration-300" />
                </div>
                <button onClick={toggleMenu} className="text-gray-700">
                    {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="fixed top-20 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 md:hidden">
                    <button className="block text-gray-700 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" onClick={() => navigate("/")}>Home</button>
                    <button className="block text-gray-700 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" onClick={() => navigate("/translator")}>Translator</button>
                    <button className="block text-gray-700 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" onClick={() => navigate("/currency")}>Currency</button>
                    <button className="block text-gray-700 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" onClick={() => navigate("/map")}>Map</button>
                    <button className="block text-gray-700 w-full text-left px-3 py-2 rounded-md hover:bg-gray-100" onClick={() => navigate("/trip-tgt")}>Trip-tgt</button>
                    <button className="text-white bg-green-500 p-2 rounded-md" onClick={() => navigate("/sign-in")}>Sign In</button>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 w-full bg-white p-4 shadow-md flex justify-around items-center md:hidden">
                <button className="text-gray-700" onClick={() => navigate("/")}><AiOutlineHome size={24} /></button>
                <button className="text-gray-700" onClick={() => navigate("/currency")}><MdCurrencyExchange size={24} /></button>
                <button className="text-gray-700" onClick={() => navigate("/map")}><LuMap size={24} /></button>
            </div>
        </>
    );
};

export default Header2;