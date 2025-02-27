import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logoGreen from '../../images/new-logo-green.png';
import Header from "../homepage/header/header";
import MenuBar from "../homepage/menubar";

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState({ label: "USD", value: "USD" });
  const [compareCurrency, setCompareCurrency] = useState({ label: "THB", value: "THB" });
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
    const value = e.target.value;
    setAmount(value);
    setConvertedAmount((exchangeRates[compareCurrency.value] * value).toFixed(2));
  };

  const handleConvertedAmountChange = (e) => {
    const value = e.target.value;
    setConvertedAmount(value);
    setAmount((value / exchangeRates[compareCurrency.value]).toFixed(2));
  };

  return (
    <div className="mt-10 min-h-screen flex flex-col bg-green-800">
      {/* Desktop Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 pt-60 p-4">
        <div className="max-w-5xl mx-auto px-10 py-8 bg-white shadow-lg rounded-lg mt-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Currency Converter</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between mb-8 p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-3xl">
            <div className="flex flex-col w-full max-w-[480px]">
              <label className="text-gray-700 font-semibold">Amount</label>
              <div className="flex items-center gap-2 border p-4 rounded-md bg-white shadow-sm w-full">
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full border-none outline-none text-lg"
                />
                <Select
                  options={currencies}
                  value={baseCurrency}
                  onChange={setBaseCurrency}
                  className="w-[180px]"
                />
              </div>
            </div>

            <span className="text-3xl font-bold hidden md:block">⇆</span>
            <span className="text-3xl font-bold md:hidden">⇅</span>

            <div className="flex flex-col w-full max-w-[480px]">
              <label className="text-gray-700 font-semibold">Converted to</label>
              <div className="flex items-center gap-2 border p-4 rounded-md bg-white shadow-sm w-full">
                <input
                  type="number"
                  value={convertedAmount}
                  onChange={handleConvertedAmountChange}
                  className="w-full border-none outline-none text-lg"
                />
                <Select
                  options={currencies}
                  value={compareCurrency}
                  onChange={setCompareCurrency}
                  className="w-[180px]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between w-full max-w-3xl gap-4">
            <div className="text-center md:text-left text-lg font-semibold">
              {amount} {baseCurrency.value} = <span className="text-green-600">{convertedAmount}</span> {compareCurrency.value}
            </div>
            <button
              onClick={fetchExchangeRate}
              className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 text-lg"
            >
              Convert
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-8 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Exchange Rates</h3>
            <table className="w-full border-collapse border border-gray-300 text-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-4">Currency</th>
                  <th className="border p-4">Exchange Rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(exchangeRates).map(([currency, rate]) => (
                  <tr key={currency} className="text-center hover:bg-gray-50">
                    <td className="border p-4">{currency}</td>
                    <td className="border p-4">{(rate * amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <MenuBar/>
    </div>
  );
};

export default CurrencyExchange;