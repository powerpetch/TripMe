import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoGreen from '../../images/new-logo-green.png';

import Header2 from '../homepage/header/header';
import MenuBar from '../homepage/menubar';

import { FaUserCircle } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { FaCopy } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdCurrencyExchange } from "react-icons/md";
import { LuMap } from "react-icons/lu";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const languages = {
    'en': 'English',
    'th': 'Thai',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'fr': 'French',
    'de': 'German',
    'es': 'Spanish',
    'it': 'Italian',
    'ru': 'Russian',
    'vi': 'Vietnamese',
    'id': 'Indonesian',
    'ms': 'Malay',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'bn': 'Bengali',
    'pt': 'Portuguese',
    'tr': 'Turkish',
    'nl': 'Dutch',
    'pl': 'Polish',
    'sv': 'Swedish',
    'da': 'Danish',
    'fi': 'Finnish',
    'no': 'Norwegian',
    'cs': 'Czech',
    'hu': 'Hungarian',
    'el': 'Greek',
    'he': 'Hebrew',
    'ro': 'Romanian',
    'sk': 'Slovak',
    'uk': 'Ukrainian',
    'hr': 'Croatian',
    'ca': 'Catalan',
    'eu': 'Basque',
    'ga': 'Irish',
    'is': 'Icelandic',
    'mk': 'Macedonian',
    'mt': 'Maltese',
    'sr': 'Serbian',
    'sq': 'Albanian',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'ka': 'Georgian',
    'uz': 'Uzbek',
    'kk': 'Kazakh',
    'ky': 'Kyrgyz',
    'tg': 'Tajik',
    'tk': 'Turkmen',
    'mn': 'Mongolian',
    'ps': 'Pashto',
    'ks': 'Kashmiri',
    'sd': 'Sindhi',
    'ne': 'Nepali',
    'pa': 'Punjabi',
    'gu': 'Gujarati',
    'or': 'Oriya',
    'ta': 'Tamil',
    'te': 'Telugu',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'si': 'Sinhala',
    'lo': 'Lao',
    'my': 'Burmese',
    'km': 'Khmer',
    'bo': 'Tibetan',
    'dz': 'Dzongkha',
    'new': 'Newari',
    'kok': 'Konkani',
    'sdh': 'Kurdish',
    'ku': 'Kurdish',
    'prs': 'Dari',
    'fa': 'Persian',
    'ug': 'Uyghur',
    'hmn': 'Hmong',
};

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

function Translator() {
    const [fromText, setFromText] = useState('');
    const [toText, setToText] = useState('');
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('th');    
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      }, []);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loginTime");
        setCurrentUser(null);
        navigate("/");
        setMenuOpen(false);
    };

    const handleExchange = () => {
        setFromText(toText);
        setToText(fromText);
        setFromLanguage(toLanguage);
        setToLanguage(fromLanguage);
    };

    const handleTranslate = async () => {
        if (!fromText) {
            setToText('');
            return;
        }
        setLoading(true);

        try {
            console.log('Attempting translation...');
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: fromText,
                    source: fromLanguage,
                    target: toLanguage,
                    format: 'text'
                })
            });
            const data = await response.json();
            
            if (data.data && data.data.translations) {
                setToText(data.data.translations[0].translatedText);
            } else {
                throw new Error('Translation failed');
            }
        } catch (error) {
            console.error('Translation error:', error);
            alert("Translation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-green-100 p-4">
            {/* Desktop Header Bar */}
            <Header2
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleLogout={handleLogout}
                navigate={navigate}
            />
            
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



      {/* ---------------- Mobile Bottom Navigation ---------------- */}
      <MenuBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </div>
  );
}

export default Translator;