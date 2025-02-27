// src/components/TripForm.jsx
import React, { useState } from 'react';

function TripForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [cost, setCost] = useState(initialData?.cost || '');
  const [includePlaneTicket, setIncludePlaneTicket] = useState(initialData?.includePlaneTicket || false);
  const [days, setDays] = useState(initialData?.days || []);

  // ฟังก์ชันเพิ่ม Day ใหม่
  const addDay = () => {
    const newDayNumber = days.length + 1;
    setDays([...days, { dayNumber: newDayNumber, places: [] }]);
  };

  // ฟังก์ชันเพิ่ม Place ใน day ที่กำหนด
  const addPlace = (dayIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].places.push({ name: '', address: '', lat: null, lng: null });
    setDays(updatedDays);
  };

  // ฟังก์ชัน handle การเปลี่ยนแปลงค่า Place
  const handlePlaceChange = (dayIndex, placeIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].places[placeIndex][field] = value;
    setDays(updatedDays);
  };

  // ฟังก์ชัน submit ฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();
    const tripData = {
      title,
      description,
      cost,
      includePlaneTicket,
      days
    };
    // ส่งข้อมูลกลับไปยัง parent หรือทำ fetch POST/PUT ตรงนี้เลยก็ได้
    onSubmit(tripData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input 
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Cost</label>
        <input
          type="text"
          className="border p-2 w-full"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={includePlaneTicket}
            onChange={(e) => setIncludePlaneTicket(e.target.checked)}
          />
          <span className="ml-2">Include Plane Ticket</span>
        </label>
      </div>

      {/* ส่วนของ Days */}
      <div className="mt-4">
        <h2 className="font-bold text-lg mb-2">Days</h2>
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4 p-2 border rounded">
            <h3 className="font-semibold">Day {day.dayNumber}</h3>
            {day.places.map((place, placeIndex) => (
              <div key={placeIndex} className="mt-2 space-y-1">
                <input
                  type="text"
                  className="border p-1 w-full"
                  placeholder="Place Name"
                  value={place.name}
                  onChange={(e) => handlePlaceChange(dayIndex, placeIndex, 'name', e.target.value)}
                />
                <input
                  type="text"
                  className="border p-1 w-full"
                  placeholder="Address"
                  value={place.address}
                  onChange={(e) => handlePlaceChange(dayIndex, placeIndex, 'address', e.target.value)}
                />
                {/* ถ้าต้องการ lat/lng ให้ใส่ฟิลด์เพิ่มตรงนี้หรือทำ Auto Geocoding */}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlace(dayIndex)}
              className="bg-gray-200 px-2 py-1 mt-2"
            >
              + Add Place
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDay}
          className="bg-blue-500 text-white px-4 py-2"
        >
          + Add Day
        </button>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Save Trip
      </button>
    </form>
  );
}

export default TripForm;
