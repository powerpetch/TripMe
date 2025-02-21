// src/components/TripDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trips/${id}`)
      .then(res => res.json())
      .then(data => {
        setTrip(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // กำหนด center เริ่มต้น (ตัวอย่างเช่น โตเกียว)
  const defaultCenter = { lat: 35.6804, lng: 139.7690 };

  if (!trip) return <div>Loading...</div>;

  // ดึง places ของ Day ที่เลือก (ถ้ามี)
  const dayPlaces = trip.days?.[selectedDayIndex]?.places || [];

  // สร้างพิกัด lat/lng เป็น array (กรณีถ้าเราเก็บ lat/lng มาแล้ว)
  const pathCoordinates = dayPlaces
    .filter(place => place.lat && place.lng)
    .map(place => ({ lat: place.lat, lng: place.lng }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{trip.title}</h1>
      <p className="mt-2">{trip.description}</p>
      <p className="mt-2">Cost: {trip.cost}</p>
      <p className="mt-2">
        Includes Plane Ticket? {trip.includePlaneTicket ? 'Yes' : 'No'}
      </p>

      {/* ปุ่มหรือแท็บสำหรับแต่ละวัน */}
      <div className="flex space-x-2 my-4">
        {trip.days?.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDayIndex(index)}
            className={`px-4 py-2 rounded 
               ${selectedDayIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Google Map */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={pathCoordinates[0] || defaultCenter}
          zoom={5}
        >
          {/* วาง Marker */}
          {pathCoordinates.map((coord, i) => (
            <Marker key={i} position={coord} />
          ))}
          {/* วาดเส้น Polyline เชื่อมจุด */}
          {pathCoordinates.length > 1 && (
            <Polyline
              path={pathCoordinates}
              options={{ strokeColor: '#FF0000', strokeWeight: 3 }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      {/* รายการสถานที่ในวันนั้น ๆ */}
      <div className="mt-4">
        {dayPlaces.map((place, i) => (
          <div key={i} className="mb-2">
            <strong>{place.name}</strong> – {place.address}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripDetail;
