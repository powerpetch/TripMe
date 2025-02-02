import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoGreen from '../../images/new-logo-green.png';
import languages from './languages';

import { BiTransfer } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCurrencyExchange } from "react-icons/md";
import { LuMap } from "react-icons/lu";
import { AiOutlineHome, AiOutlineSetting, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Translator() {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en-GB');
    const [toLanguage, setToLanguage] = useState('th-TH');
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const copyContent = (text) => {
        navigator.clipboard.writeText(text);
    }

    const utterText = (text, language) => {
        const synth = window.speechSynthesis;
        if (!synth) {
            alert("Speech synthesis not supported in this browser");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        synth.speak(utterance);
    }

    const handleExchange = () => {
        setFromText(toText);
        setToText(fromText);
        setFromLanguage(toLanguage);
        setToLanguage(fromLanguage);
    };

    const handleTranslate = () => {
        if (!fromText) {
            setToText('');
            return;
        }
        setLoading(true);
        let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setToText(data.responseData.translatedText);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                alert("Translation failed. Please try again.");
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-green-100 p-4">
            {/* Desktop Header Bar */}
            <div className="hidden md:block w-full bg-white p-4 shadow-md fixed top-0 left-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                        <img src={logoGreen} alt="Logo" className="h-12 transition-transform duration-300" />
                    </div>
                    <div className="flex space-x-8">
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/")}>Home</button>
                        <button className="text-green-600 font-bold text-lg" onClick={() => navigate("/translator")}>Translator</button>
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/currency")}>Currency</button>
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/map")}>Map</button>
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/trip-tgt")}>Trip-tgt</button>
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/faq")}>FAQ</button>
                        <button className="text-gray-700 hover:text-green-600 text-lg" onClick={() => navigate("/contact")}>Contact</button>
                    </div>
                </div>
            </div>

            {/* Translator Container */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg w-full max-w-md md:max-w-2xl mt-24 flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Translate</h2>

                {/* Language Selection */}
                <div className="flex justify-between items-center bg-emerald-100 rounded-xl p-3 md:p-4 my-4 w-full">
                    <select className="p-2 md:p-3 rounded-md bg-transparent w-1/3 text-center font-medium text-sm md:text-base"
                        value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
                        {Object.entries(languages).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                    <button className="p-2 md:p-3 bg-emerald-300 rounded-full hover:bg-emerald-400" onClick={handleExchange}>
                        <BiTransfer size={24} />
                    </button>
                    <select className="p-2 md:p-3 rounded-md bg-transparent w-1/3 text-center font-medium text-sm md:text-base"
                        value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
                        {Object.entries(languages).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                {/* Text Areas */}
                <div className="w-full space-y-6">
                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg relative">
                        <textarea 
                            className="w-full bg-transparent focus:outline-none resize-none text-gray-700 text-base md:text-lg"
                            placeholder="Enter text"
                            value={fromText}
                            onChange={(e) => { setFromText(e.target.value); if (!e.target.value) setToText(''); }}
                            rows={4}
                        ></textarea>
                        <div className="absolute bottom-3 right-3 flex space-x-3">
                            <button className="text-gray-600 hover:text-green-600" onClick={() => copyContent(fromText)}>
                                <FaCopy size={20} />
                            </button>
                            <button className="text-gray-600 hover:text-green-600" onClick={() => utterText(fromText, fromLanguage)}>
                                <HiSpeakerWave size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-200 p-4 md:p-6 rounded-lg relative">
                        <textarea 
                            className="w-full bg-transparent focus:outline-none resize-none text-gray-700 text-base md:text-lg"
                            value={toText}
                            readOnly
                            rows={4}
                        ></textarea>
                        <div className="absolute bottom-3 right-3 flex space-x-3">
                            <button className="text-gray-600 hover:text-green-600" onClick={() => copyContent(toText)}>
                                <FaCopy size={20} />
                            </button>
                            <button className="text-gray-600 hover:text-green-600" onClick={() => utterText(toText, toLanguage)}>
                                <HiSpeakerWave size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Translate Button */}
                <button 
                    className="w-full mt-6 bg-green-500 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition duration-300"
                    onClick={handleTranslate}
                    disabled={loading}
                >
                    {loading ? 'Translating...' : 'Translate'}
                </button>
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
                    <button className="text-gray-700" onClick={() => navigate("/")}>Home</button>
                    <button className="text-green-600 font-bold" onClick={() => navigate("/translator")}>Translator</button>
                    <button className="text-gray-700" onClick={() => navigate("/currency")}>Currency</button>
                    <button className="text-gray-700" onClick={() => navigate("/map")}>Map</button>
                    <button className="text-gray-700" onClick={() => navigate("/trip-tgt")}>Trip-tgt</button>
                    <button className="text-gray-700" onClick={() => navigate("/faq")}>FAQ</button>
                    <button className="text-gray-700" onClick={() => navigate("/contact")}>Contact</button>
                    <button className="text-white bg-green-500 p-2 rounded-md" onClick={() => navigate("/sign-in")}>Sign In</button>
                </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 w-full bg-white p-4 shadow-md flex justify-around items-center md:hidden">
                <button className="text-gray-700" onClick={() => navigate("/")}><AiOutlineHome size={24} /></button>
                <button className="text-gray-700" onClick={() => navigate("/currency")}><MdCurrencyExchange size={24} /></button>
                <button className="text-gray-700" onClick={() => navigate("/map")}><LuMap size={24} /></button>
            </div>
        </div>
    );
}

export default Translator;