import React from 'react';
import '../App.css';

const SearchBar = () => (
  <div className="search-container">
    <input type="text" className="search-bar" placeholder="Where are you going?" />
    <button className="search-button">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
);

export default SearchBar;