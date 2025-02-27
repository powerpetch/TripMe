// src/components/TripList.jsx
import React, { useEffect, useState } from 'react';

function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trips')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map(trip => (
          <div key={trip._id} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{trip.title}</h2>
            <p>{trip.description}</p>
            <p className="mt-2">
              <a 
                href={`/trip/${trip._id}`} 
                className="text-blue-500 underline">
                See More
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripList;
