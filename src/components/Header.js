import React, { useState } from 'react';

function Header() {
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('THB');

  const currencies = [
    { code: 'THB', country: 'Thailand' },
    { code: 'USD', country: 'United States' },
    { code: 'EUR', country: 'Europe' },
    { code: 'GBP', country: 'United Kingdom' },
    { code: 'JPY', country: 'Japan' }
  ];

  return (
    <header className="header">
      <div className="top-bar">
        <nav className="navigation">
          <div className="logo-container">
            <a className="logo-link" href="/">
              <picture>
                <img className="logo-img" src="" alt="TripMe" />
              </picture>
            </a>
          </div>
          
          <div className="menu-container">
            <div className="menu">
              {['Translator', 'Currency', 'Trip-Part'].map((item) => (
                <div key={item} className="menu-item">
                  <button className="menu-button" type="button">
                    <span className="menu-text">{item}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-container">
            <div className="currency-selector">
              <button 
                className="currency-button" 
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                <span className="currency-icon">🌍</span>
                <span className="currency-text">{selectedCurrency}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {showCurrencyDropdown && (
                <div className="currency-dropdown">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      className="currency-option"
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setShowCurrencyDropdown(false);
                      }}
                    >
                      <span className="currency-code">{currency.code}</span>
                      <span className="country-name">{currency.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="auth-container">
              <button className="sign-in-button">
                Sign in
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 