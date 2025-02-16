// src/components/map/Map.jsx
import React, { useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function Map({
  coordinates, setCoordinates, mapRef,
  places, selectedPlace, setSelectedPlace,
  showAllMarkers,
}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, [mapRef]);

  const onIdle = useCallback(() => {
    if (!mapRef.current) return;
    const center = mapRef.current.getCenter();
    setCoordinates({ lat: center.lat(), lng: center.lng() });
  }, [mapRef, setCoordinates]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading map...</div>;
  }

  // สร้าง marker แสดงทั้งหมด (ถ้า showAllMarkers เป็น true)
  const renderAllMarkers = () => {
    return places.map((place, i) => {
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();
      if (!lat || !lng) return null;

      return (
        <Marker
          key={i}
          position={{ lat, lng }}
          // optional: ลองใส่ icon สีแดง
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }}
          onClick={() => setSelectedPlace(place)}
        />
      );
    });
  };

  // สร้าง marker เฉพาะจุดที่ผู้ใช้คลิก
  const renderSelectedMarker = () => {
    if (!selectedPlace) return null;
    const lat = selectedPlace.geometry?.location?.lat();
    const lng = selectedPlace.geometry?.location?.lng();
    if (!lat || !lng) return null;

    return (
      <Marker
        position={{ lat, lng }}
        icon={{
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }}
      />
    );
  };

  return (
    <GoogleMap
      onLoad={onLoad}
      onIdle={onIdle}
      center={coordinates}
      zoom={13}
      mapContainerClassName="w-full h-full"
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {/* ถ้า user กดปุ่ม “แสดงทั้งหมด” => showAllMarkers = true => วาด Marker ทั้งหมด */}
      {showAllMarkers && renderAllMarkers()}
      {/* ถ้า user คลิกสถานที่ลิสต์ => selectedPlace => วาด Marker เดียว */}
      {!showAllMarkers && renderSelectedMarker()}
    </GoogleMap>
  );
}

export default Map;
