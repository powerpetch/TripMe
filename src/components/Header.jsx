import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('THB');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainSearchBarPosition = document.querySelector('.search-container').offsetTop;
      const offset = 70; // Adjust this value to require more scrolling
      setIsScrolled(window.scrollY > mainSearchBarPosition + offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { code: 'THB', country: 'Thailand' },
    { code: 'USD', country: 'United States' },
    { code: 'EUR', country: 'Europe' },
    { code: 'GBP', country: 'United Kingdom' },
    { code: 'JPY', country: 'Japan' }
  ];

  const handleMenuClick = (item) => {
    switch (item) {
      case 'Translator':
        navigate('/translate');
        break;
      case 'Currency':
        navigate('/currency'); // Ensure this route exists
        break;
      case 'Trip-Part':
        navigate('/trip-part'); // Ensure this route exists
        break;
      case 'Map':
        navigate('/map');
        break;
      default:
        break;
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <nav className="navigation">
          <div className="logo-container">
            <a className="logo-link" href="/">
              <picture>
                <img className="logo-img" src="" alt="TripMe" />
              </picture>
            </a>
          </div>
          
          {isScrolled && (
            <div className="mini-search-container">
              <div className="mini-search">
                <input
                  type="text"
                  placeholder="Search..."
                  className="mini-search-input"
                />
                <button className="mini-search-button">🔍</button>
              </div>
            </div>
          )}

          <div className={`menu-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="menu">
              {['Translator', 'Currency', 'Trip-Part', 'Map'].map((item) => (
                <div key={item} className="menu-item">
                  <button 
                    className="menu-button" 
                    type="button"
                    onClick={() => handleMenuClick(item)}
                  >
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