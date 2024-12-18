import React, { useState } from 'react';
import SearchTab from './SearchTab';
import PopularPlaces from './PopularPlaces';
import AdditionalContent from './AdditionalContent';

function MainContent() {
  const [activeTab, setActiveTab] = useState('Search All');
  
  const tabs = [
    { 
      id: 'Search All', 
      icon: '🔍', 
      placeholder: 'Where to?',
      searchPlaceholder: 'Destinations, hotels, restaurants...'
    },
    { 
      id: 'Things to Do', 
      icon: '🎯', 
      placeholder: 'Find something fun',
      searchPlaceholder: 'Attractions, activities...'
    },
    { 
      id: 'Hotels', 
      icon: '🏨', 
      placeholder: 'Find places to stay',
      searchPlaceholder: 'Hotel name, location...'
    },
    { 
      id: 'Restaurants', 
      icon: '🍽️', 
      placeholder: 'Find places to eat',
      searchPlaceholder: 'Restaurant name, cuisine type...'
    },
    { 
      id: 'Bus-Stops', 
      icon: '🚌', 
      placeholder: 'Find bus stops nearby',
      searchPlaceholder: 'Bus stop name, route number...'
    },
    { 
      id: 'Vacation Rentals', 
      icon: '🏠', 
      placeholder: 'Find vacation rentals',
      searchPlaceholder: 'Location, property type...'
    }
  ];

  const getActivePlaceholder = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData?.placeholder || 'Where to?';
  };

  const getActiveSearchPlaceholder = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData?.searchPlaceholder || 'Search destinations...';
  };

  return (
    <div className="content-container">
      <main className="main">
        <div className="hero-section">
          <h1 className="hero-title">{getActivePlaceholder()}</h1>
        </div>
        
        <div className="tabs-container">
          <div className="tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                role="tab"
                onClick={() => setActiveTab(tab.id)}
                aria-selected={activeTab === tab.id}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.id}</span>
              </button>
            ))}
          </div>
          
          <SearchTab placeholder={getActiveSearchPlaceholder()} />
        </div>

        <PopularPlaces />
        <AdditionalContent />
      </main>
    </div>
  );
}

export default MainContent; 