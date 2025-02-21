// src/pages/EditTripPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';

function EditTripPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trips/${id}`)
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdateTrip = async (tripData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData),
      });
      if (!res.ok) throw new Error('Failed to update trip');
      const updatedTrip = await res.json();
      navigate(`/trip/${updatedTrip._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Edit Trip</h1>
      <TripForm onSubmit={handleUpdateTrip} initialData={initialData} />
    </div>
  );
}

export default EditTripPage;
