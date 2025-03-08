import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import logoGreen from '../../images/new-logo-green.png';
import Header from "../homepage/header/header";
import MenuBar from "../homepage/menubar";

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState({ label: "USD", value: "USD" });
  const [compareCurrency, setCompareCurrency] = useState({ label: "THB", value: "THB" });
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  // const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useNavigate();

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  useEffect(() => {
    axios.get("https://api.exchangerate-api.com/v4/latest/USD").then((response) => {
      const currencyOptions = Object.keys(response.data.rates).map((currency) => ({
        label: currency,
        value: currency
      }));
      setCurrencies(currencyOptions);
    });
  }, []);

  const fetchExchangeRate = async () => {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency.value}`);
    setExchangeRates(response.data.rates);
    setConvertedAmount((response.data.rates[compareCurrency.value] * amount).toFixed(2));
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [baseCurrency, compareCurrency, amount]);

  const handleAmountChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setAmount(value);
    setConvertedAmount((exchangeRates[compareCurrency.value] * value).toFixed(2));
  };
  
  const handleConvertedAmountChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setConvertedAmount(value);
    setAmount((value / exchangeRates[compareCurrency.value]).toFixed(2));
  };

  return (
    <div className="mt-10 min-h-screen flex flex-col bg-green-800">
      {/* Desktop Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 w-full pt-20 pb-4 px-2 md:px-4">
        <div className="
          max-w-md md:max-w-3xl
          mx-auto 
          bg-white 
          rounded-lg 
          shadow-md 
          p-4 
          md:p-8
        ">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">
            Currency Converter
          </h2>

          {/* Input + Select */}
          <div className="
            flex 
            flex-col md:flex-row 
            items-center 
            gap-4 
            justify-between 
            mb-6 
            w-full
          ">
            {/* baseCurrency */}
            <div className="flex-1 w-full">
              <label className="block text-gray-700 font-semibold mb-1">
                Amount
              </label>
              <div className="flex items-center gap-2 border p-2 rounded-md bg-white shadow-sm">
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full border-none outline-none text-base md:text-lg"
                />
                <Select
                  options={currencies}
                  value={baseCurrency}
                  onChange={setBaseCurrency}
                  className="min-w-[110px] md:w-[150px]"
                />
              </div>
            </div>

            {/* swap */}
            <div className="hidden md:block text-3xl font-bold">⇆</div>
            <div className="block md:hidden text-3xl font-bold">⇅</div>

            {/* compareCurrency */}
            <div className="flex-1 w-full">
              <label className="block text-gray-700 font-semibold mb-1">
                Converted to
              </label>
              <div className="flex items-center gap-2 border p-2 rounded-md bg-white shadow-sm">
                <input
                  type="number"
                  min="0"
                  value={convertedAmount}
                  onChange={handleConvertedAmountChange}
                  className="w-full border-none outline-none text-base md:text-lg"
                />
                <Select
                  options={currencies}
                  value={compareCurrency}
                  onChange={setCompareCurrency}
                  className="min-w-[110px] md:w-[150px]"
                />
              </div>
            </div>
          </div>

          {/* ผลลัพธ์ */}
          <div className="
            flex 
            flex-col 
            md:flex-row 
            justify-between 
            items-center 
            w-full
            gap-4
          ">
            <div className="text-center md:text-left text-sm md:text-base font-semibold">
              {amount} {baseCurrency.value} 
              <span className="mx-1">=</span>
              <span className="text-green-600">
                {convertedAmount} {compareCurrency.value}
              </span>
            </div>

            <button
              onClick={fetchExchangeRate}
              className="
                px-4 py-2 
                bg-green-500 
                text-white 
                rounded-md 
                hover:bg-green-600 
                text-sm md:text-base
                font-semibold
              "
            >
              Convert
            </button>
          </div>

          {/* exchange rates table */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full mt-8">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Exchange Rates
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3 md:p-4">Currency</th>
                    <th className="border p-3 md:p-4">Exchange Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(exchangeRates).map(([currency, rate]) => (
                    <tr key={currency} className="text-center hover:bg-gray-50">
                      <td className="border p-3 md:p-4">{currency}</td>
                      <td className="border p-3 md:p-4">
                        {(rate * amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {/* <MenuBar/> */}
    </div>
  );
};

export default CurrencyExchange;