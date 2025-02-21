// src/pages/CreateTripPage.jsx
import React from 'react';
import TripForm from '../components/TripForm';
import { useNavigate } from 'react-router-dom';

function CreateTripPage() {
  const navigate = useNavigate();

  const handleCreateTrip = async (tripData) => {
    try {
      const res = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData),
      });
      if (!res.ok) throw new Error('Failed to create trip');
      const createdTrip = await res.json();
      // ไปยังหน้ารายละเอียดของทริปที่เพิ่งสร้าง
      navigate(`/trip/${createdTrip._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Create a New Trip</h1>
      <TripForm onSubmit={handleCreateTrip} />
    </div>
  );
}

export default CreateTripPage;
