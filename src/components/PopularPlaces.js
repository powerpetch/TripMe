import React, { useState } from 'react';

function PopularPlaces() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const places = [
    {
      id: 1,
      image: 'https://example.com/thailand.jpg',
      country: 'Thailand',
      location: 'Phuket',
      likes: '2.5k',
      description: 'Crystal clear waters and beautiful beaches'
    },
    {
      id: 2,
      image: 'https://example.com/japan.jpg',
      country: 'Japan',
      location: 'Mount Fuji',
      likes: '3.2k',
      description: 'Iconic mountain with scenic views'
    },
    {
      id: 3,
      image: 'https://example.com/france.jpg',
      country: 'France',
      location: 'Paris',
      likes: '4.1k',
      description: 'City of lights and romance'
    },
    {
      id: 4,
      image: 'https://example.com/italy.jpg',
      country: 'Italy',
      location: 'Venice',
      likes: '3.8k',
      description: 'Romantic canals and historic architecture'
    },
    {
      id: 5,
      image: 'https://example.com/usa.jpg',
      country: 'USA',
      location: 'New York',
      likes: '5.0k',
      description: 'The city that never sleeps'
    },
    {
      id: 6,
      image: 'https://example.com/australia.jpg',
      country: 'Australia',
      location: 'Sydney',
      likes: '3.5k',
      description: 'Famous for its Sydney Opera House'
    },
    {
      id: 7,
      image: 'https://example.com/egypt.jpg',
      country: 'Egypt',
      location: 'Cairo',
      likes: '2.8k',
      description: 'Home to the ancient pyramids'
    },
    {
      id: 8,
      image: 'https://example.com/brazil.jpg',
      country: 'Brazil',
      location: 'Rio de Janeiro',
      likes: '4.7k',
      description: 'Known for its Carnival festival'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= places.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 4 < 0 ? places.length - 4 : prevIndex - 4
    );
  };

  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex + 4 < places.length;

  return (
    <div className="popular-places">
      <h2 className="section-title">Popular Destinations</h2>
      <div className="places-container">
        {showLeftArrow && (
          <button className="nav-button prev" onClick={prevSlide}>←</button>
        )}
        <div className="places-wrapper">
          {places.slice(currentIndex, currentIndex + 4).map((place) => (
            <div key={place.id} className="place-card">
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
  );
}

export default PopularPlaces; 