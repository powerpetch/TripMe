import React, { useState } from 'react';
import phuketImage from '../assets/phuket.jpg';
import japanImage from '../assets/Mount-Fuji.jpg';
import australiaImage from '../assets/Sydney.jpg';
import USAImage from '../assets/new-york.jpg';
import italyImage from '../assets/venice.jpeg';
import franceImage from '../assets/paris.jpg';
import egyptImage from '../assets/cairo.jpg';
import brazilImage from '../assets/rio-de-janeiro.jpeg';

function PopularPlaces() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const placesToShow = 2; // Number of places to display at once

  const places = [
    {
      id: 1,
      image: phuketImage,
      country: 'Thailand',
      location: 'Phuket',
      likes: '2.5k',
      description: 'Crystal clear waters and beautiful beaches'
    },
    {
      id: 2,
      image: japanImage,
      country: 'Japan',
      location: 'Mount Fuji',
      likes: '3.2k',
      description: 'Iconic mountain with scenic views'
    },
    {
      id: 3,
      image: franceImage,
      country: 'France',
      location: 'Paris',
      likes: '4.1k',
      description: 'City of lights and romance'
    },
    {
      id: 4,
      image: italyImage,
      country: 'Italy',
      location: 'Venice',
      likes: '3.8k',
      description: 'Romantic canals and historic architecture'
    },
    {
      id: 5,
      image: USAImage,
      country: 'USA',
      location: 'New York',
      likes: '5.0k',
      description: 'The city that never sleeps'
    },
    {
      id: 6,
      image: australiaImage,
      country: 'Australia',
      location: 'Sydney',
      likes: '3.5k',
      description: 'Famous for its Sydney Opera House'
    },
    {
      id: 7,
      image: egyptImage,
      country: 'Egypt',
      location: 'Cairo',
      likes: '2.8k',
      description: 'Home to the ancient pyramids'
    },
    {
      id: 8,
      image: brazilImage,
      country: 'Brazil',
      location: 'Rio de Janeiro',
      likes: '4.7k',
      description: 'Known for its Carnival festival'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= places.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? places.length - 1 : prevIndex - 1
    );
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex + placesToShow < places.length;

  return (
    <>
      <div className="popular-places">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="places-container">
          {showLeftArrow && (
            <button className="nav-button prev" onClick={prevSlide}>←</button>
          )}
          <div className="places-wrapper">
            {places.slice(currentIndex, currentIndex + placesToShow + 1).map((place, index) => (
              <div key={place.id} className={`place-card ${index === placesToShow ? 'peek' : ''}`}>
                <div className="place-image">
                  <img src={place.image} alt={place.location} />
                </div>
                <div className="place-info">
                  <div className="place-header">
                    <h3>{place.location}</h3>
                    <span className="country">{place.country}</span>
                  </div>
                  <div className="place-stats">
                    <span className="likes">♥ {place.likes}</span>
                    <button className="save-button">Save</button>
                  </div>
                  <p className="place-description">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
          {showRightArrow && (
            <button className="nav-button next" onClick={nextSlide}>→</button>
          )}
        </div>
      </div>
    </>
  );
}

export default PopularPlaces; 