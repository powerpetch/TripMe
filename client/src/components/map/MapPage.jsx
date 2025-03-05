import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Map from './Map';
import SidePanel from './SidePanel';
import MenuBar from '../homepage/menubar';

import { FaUtensils, FaHotel, FaCamera, FaLandmark, FaBus } from 'react-icons/fa';
import { MdLocalPharmacy, MdLocalAtm } from 'react-icons/md';

const categories = [
  { key: 'restaurant', label: 'Restaurants', icon: <FaUtensils /> },
  { key: 'lodging', label: 'Hotels', icon: <FaHotel /> },
  { key: 'tourist_attraction', label: 'Attractions', icon: <FaCamera /> },
  { key: 'museum', label: 'Museums', icon: <FaLandmark /> },
  { key: 'bus_station', label: 'Transit', icon: <FaBus /> },
  { key: 'pharmacy', label: 'Pharmacy', icon: <MdLocalPharmacy /> },
  { key: 'atm', label: 'ATM', icon: <MdLocalAtm /> },
];

function MapPage() {
  const [coordinates, setCoordinates] = useState({ lat: 13.7563, lng: 100.5018 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [places, setPlaces] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  const [detailedPlace, setDetailedPlace] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => console.warn(err.message)
      );
    }
  }, []);

  const handleSelectCategory = (catKey) => {
    if (selectedCategory === catKey && isPanelOpen) {
      setIsPanelOpen(false);
      return;
    }
    setSelectedCategory(catKey);
    setIsPanelOpen(true);
    setShowAllMarkers(false);
    setSelectedPlace(null);
    setDetailedPlace(null);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setPlaces([]);
    setSelectedPlace(null);
    setDetailedPlace(null);
    setSelectedCategory(null);
    setShowAllMarkers(false);
  };

  useEffect(() => {
    if (!isPanelOpen) return;
    if (!selectedCategory) return;
    if (!mapRef.current) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng),
      radius: 3000,
      type: selectedCategory,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      }
    });
  }, [isPanelOpen, selectedCategory, coordinates]);

  const fetchPlaceDetails = (place) => {
    if (!mapRef.current || !place?.place_id) return;
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      placeId: place.place_id,
      fields: [
        'name','rating','formatted_address','formatted_phone_number',
        'photos','opening_hours','website','reviews'
      ],
    };
    service.getDetails(request, (details, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setDetailedPlace(details);
      }
    });
  };

  const handleSelectPlaceInList = (place) => {
    setSelectedPlace(place);
    setShowAllMarkers(false);
    setDetailedPlace(null);
    fetchPlaceDetails(place);
  };

  const handleShowAllMarkers = () => {
    setShowAllMarkers(true);
    setSelectedPlace(null);
    setDetailedPlace(null);
  };

  const handleBackToList = () => {
    setDetailedPlace(null);
  };

  const handleSearchLocation = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCoordinates({ lat, lng });

    setSelectedPlace(place);
    setShowAllMarkers(false);
    setDetailedPlace(null);
    fetchPlaceDetails(place);

    setIsPanelOpen(true);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-50">
      <Header onSearchLocation={handleSearchLocation} />

      <div className="relative flex-1">
        {/* Category Buttons */}
        <div className="
          absolute top-4 left-4
          flex flex-wrap items-center
          gap-2 z-20
        ">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleSelectCategory(cat.key)}
              className={`
                flex items-center gap-1 px-3 py-1
                rounded-full shadow bg-green-100
                hover:bg-green-200 transition
                ${
                  selectedCategory === cat.key && isPanelOpen
                    ? 'ring-2 ring-green-600'
                    : ''
                }
              `}
            >
              {cat.icon}
              <span className="text-sm">{cat.label}</span>
            </button>
          ))}
        </div>

        <Map
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          mapRef={mapRef}
          places={places}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          showAllMarkers={showAllMarkers}
        />

        <SidePanel
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          places={places}
          detailedPlace={detailedPlace}
          onSelectPlaceInList={handleSelectPlaceInList}
          onShowAllMarkers={handleShowAllMarkers}
          onBackToList={handleBackToList}
        />
      </div>
      <MenuBar />
    </div>
  );
}

export default MapPage;
