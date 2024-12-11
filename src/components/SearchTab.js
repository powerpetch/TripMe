import React from 'react';

function SearchTab({ placeholder }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
        />
        <button className="search-submit">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchTab; 