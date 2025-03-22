import React from "react";
import "./Loader.css";

function TripTGTPage() {
  React.useEffect(() => {
    // Use replace to avoid adding a new history entry
    window.location.replace("http://localhost:5173/");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <span className="loader"></span>
    </div>
  );
}

export default TripTGTPage;
