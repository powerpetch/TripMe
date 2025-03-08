import React from 'react';
import './Loader.css'

function TripTGTPage() {
  React.useEffect(() => {
    window.location.href = 'http://localhost:5173/';
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <span class="loader"></span>
      {/* <p className="text-gray-600 text-lg">Loading TripTGT...</p> */}
    </div>
  );
}

export default TripTGTPage;
