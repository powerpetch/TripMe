import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';
import Header2 from '../homepage/header/OtherHeader';
import { motion } from "framer-motion";
import { 
  MapPin, Building, Bus, 
  Cloud, DollarSign, Image, PlusCircle, Trash2, Shirt, Lightbulb
} from 'lucide-react';
import { FaCalendarAlt } from 'react-icons/fa';

import "react-datepicker/dist/react-datepicker.css";
import Header from '../homepage/header/header';

const EditMyTrip = () => {
  const { tripId } = useParams(); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // For user avatar
  const [avatarURL, setAvatarURL] = useState(null);

  // Trip details from server
  const [tripDetails, setTripDetails] = useState({
    country: '',
    travelPeriod: { startDate: '', endDate: '' },
    visitedPlaces: [],
    accommodations: [],
    transportations: [],
    weatherNotes: '',
    clothingTips: '',
    budgetItems: [],
    photos: [],
  });

  // Current form states
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [transportations, setTransportations] = useState([]);
  const [weatherNotes, setWeatherNotes] = useState('');
  const [clothingTips, setClothingTips] = useState('');
  const [budgetItems, setBudgetItems] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [deletedPhotos, setDeletedPhotos] = useState([]);

  // For multi-step sections
  const [activeSection, setActiveSection] = useState('general');

  // 1. Fetch user (for avatar)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          // handle avatar
          if (data.user.avatar) {
            if (data.user.avatar.startsWith("http")) {
              setAvatarURL(data.user.avatar);
            } else {
              setAvatarURL(`${process.env.REACT_APP_API_BASE_URL}${data.user.avatar}`);
            }
          }
        } else {
          throw new Error(data.message || "Could not fetch user profile");
        }
      })
      .catch((err) => {
        console.error("Fetch user error:", err);
        navigate("/login");
      });
  }, [navigate]);

  // 2. Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}`);
        const tripData = await res.json();
        if (res.ok) {
          setTripDetails(tripData);
        } else {
          console.error("Failed to fetch trip details");
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [tripId]);

  // 3. Populate local states from tripDetails
  useEffect(() => {
    if (tripDetails) {
      setCountry(tripDetails.country || '');
      setStartDate(
        tripDetails.travelPeriod?.startDate
          ? new Date(tripDetails.travelPeriod.startDate)
          : null
      );
      setEndDate(
        tripDetails.travelPeriod?.endDate
          ? new Date(tripDetails.travelPeriod.endDate)
          : null
      );
      // unify visitedPlaces: rename _id -> id
      setVisitedPlaces(
        (tripDetails.visitedPlaces || []).map((p) => ({
          ...p,
          id: p._id, // unify
        }))
      );
      // unify accommodations: rename _id -> id
      setAccommodations(
        (tripDetails.accommodations || []).map((a) => ({
          ...a,
          id: a._id,
        }))
      );
      // unify transportations
      setTransportations(
        (tripDetails.transportations || []).map((t) => ({
          ...t,
          id: t._id,
        }))
      );
      // unify budgetItems
      setBudgetItems(
        (tripDetails.budgetItems || []).map((b) => ({
          ...b,
          id: b._id,
        }))
      );

      setWeatherNotes(tripDetails.weatherNotes || "");
      setClothingTips(tripDetails.clothingTips || "");

      // unify photos
      if (tripDetails.photos) {
        setPhotos(
          tripDetails.photos.map((photo) => ({
            id: photo._id, // Use database ID
            url: photo.url,
            public_id: photo.public_id,
            isExisting: true,
            file: null,
          }))
        );
      }
    }
  }, [tripDetails]);

  // ---- 4. Add/Update/Remove logic for each section ----

  // Visited Places
  const addVisitedPlace = () => {
    const newPlace = {
      id: Date.now().toString(),
      name: '',
      description: ''
    };
    setVisitedPlaces((prev) => [...prev, newPlace]);
  };
  const updateVisitedPlace = (id, field, value) => {
    setVisitedPlaces((prev) =>
      prev.map((place) => 
        place.id === id ? { ...place, [field]: value } : place
      )
    );
  };
  const removeVisitedPlace = (id) => {
    setVisitedPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  // Accommodations
  const addAccommodation = () => {
    const newAcc = {
      id: Date.now().toString(),
      name: '',
      type: '',
      bookingPlatform: '',
    };
    setAccommodations((prev) => [...prev, newAcc]);
  };
  const updateAccommodation = (id, field, value) => {
    setAccommodations((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, [field]: value } : acc
      )
    );
  };
  const removeAccommodation = (id) => {
    setAccommodations((prev) => prev.filter((acc) => acc.id !== id));
  };

  // Transportations
  const addTransportation = () => {
    const newTrans = {
      id: Date.now().toString(),
      type: '',
      from: '',
      to: '',
      bookingPlatform: '',
    };
    setTransportations((prev) => [...prev, newTrans]);
  };
  const updateTransportation = (id, field, value) => {
    setTransportations((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  };
  const removeTransportation = (id) => {
    setTransportations((prev) => prev.filter((t) => t.id !== id));
  };

  // Budget Items
  const addBudgetItem = () => {
    const newBudget = {
      id: Date.now().toString(),
      category: '',
      description: '',
      amount: ''
    };
    setBudgetItems((prev) => [...prev, newBudget]);
  };
  const updateBudgetItem = (id, field, value) => {
    setBudgetItems((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, [field]: value } : b
      )
    );
  };
  const removeBudgetItem = (id) => {
    setBudgetItems((prev) => prev.filter((b) => b.id !== id));
  };

  // Photo uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const newPhotos = acceptedFiles.map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        isExisting: false,
        url: null,
        public_id: null,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
  });
  const removePhoto = (id) => {
    setPhotos((prev) => {
      const photoToRemove = prev.find((p) => p.id === id);
      if (!photoToRemove) return prev;

      // If it's an existing photo from DB, push it to deletedPhotos
      if (photoToRemove.isExisting) {
        setDeletedPhotos((deleted) => [...deleted, photoToRemove]);
      }
      // Revoke preview if new
      if (photoToRemove.preview) {
        URL.revokeObjectURL(photoToRemove.preview);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  // Next/Prev section
  const navigateToNextSection = (e) => {
    e.preventDefault();
    const sections = ['general', 'places', 'accommodation', 'transportation', 'tips', 'budget', 'gallery'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };
  const navigateToPreviousSection = (e) => {
    e.preventDefault();
    const sections = ['general', 'places', 'accommodation', 'transportation', 'tips', 'budget', 'gallery'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  // Calculate total budget
  const totalBudget = budgetItems.reduce((sum, item) => {
    const amount = parseFloat(item.amount) || 0;
    return sum + amount;
  }, 0);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('country', country);
    formData.append('travelPeriod', JSON.stringify({ startDate, endDate }));
    formData.append('visitedPlaces', JSON.stringify(visitedPlaces));
    formData.append('accommodations', JSON.stringify(accommodations));
    formData.append('transportations', JSON.stringify(transportations));
    formData.append('weatherNotes', weatherNotes);
    formData.append('clothingTips', clothingTips);
    formData.append('budgetItems', JSON.stringify(budgetItems));
    for (const photo of photos) {
      if (!photo.isExisting && photo.file) {
        formData.append("photos", photo.file);
      }
    }
    formData.append('deletedPhotos', JSON.stringify(deletedPhotos));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      console.log('Trip updated:', data);
      navigate(data.redirectUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header2 user={user} avatarUrl={avatarURL} />

      <div className="flex-1 pt-20 p-4 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Edit My Trip</h2>

          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveSection('general')}
              className={`px-4 py-2 rounded-full ${activeSection === 'general' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              General
            </button>
            <button 
              onClick={() => setActiveSection('places')}
              className={`px-4 py-2 rounded-full ${activeSection === 'places' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Places
            </button>
            <button 
              onClick={() => setActiveSection('accommodation')}
              className={`px-4 py-2 rounded-full ${activeSection === 'accommodation' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Accommodation
            </button>
            <button 
              onClick={() => setActiveSection('transportation')}
              className={`px-4 py-2 rounded-full ${activeSection === 'transportation' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Transportation
            </button>
            <button 
              onClick={() => setActiveSection('tips')}
              className={`px-4 py-2 rounded-full ${activeSection === 'tips' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Tips
            </button>
            <button 
              onClick={() => setActiveSection('budget')}
              className={`px-4 py-2 rounded-full ${activeSection === 'budget' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Budget
            </button>
            <button 
              onClick={() => setActiveSection('gallery')}
              className={`px-4 py-2 rounded-full ${activeSection === 'gallery' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700  hover:bg-gray-300'}`}
            >
              Gallery
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* General */}
            {activeSection === 'general' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <MapPin className="mr-2" /> General Information
                </h3>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter country name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Travel Period</label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-600 text-sm mb-1">Start Date</label>
                      <div className='relative'>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer custom-datepicker"
                          placeholderText=""
                          dateFormat="MMMM d, yyyy"
                        />
                        {!startDate && (
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 text-sm mb-1">End Date</label>
                      <div className='relative'>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          disabled={!startDate}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer custom-datepicker"
                          placeholderText=""
                          dateFormat="MMMM d, yyyy"
                        />
                        {!endDate && (
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-gray-600">
                  {startDate && endDate ? (() => {
                    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                    if (durationInDays <= 0) {
                      return 'Trip duration: Less than a day';
                    } else if (durationInDays === 1) {
                      return `Trip duration: ${durationInDays} day`;
                    } else {
                      return `Trip duration: ${durationInDays} days`;
                    }
                  })() : (
                    'Please select both start and end dates to see trip duration'
                  )}
                </div>
              </div>
            )}

            {/* Places */}
            {activeSection === 'places' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <MapPin className="mr-2" /> Visited Places
                </h3>

                {visitedPlaces.map((place, index) => (
                  <div key={place.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Place #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeVisitedPlace(place.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mb-3">
                      <label className="block text-gray-600 text-sm mb-1">Place Name</label>
                      <input
                        type="text"
                        value={place.name}
                        onChange={(e) => updateVisitedPlace(place.id, 'name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter place name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Description</label>
                      <textarea
                        value={place.description}
                        onChange={(e) => updateVisitedPlace(place.id, 'description', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Describe your experience"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVisitedPlace}
                  className="flex items-center justify-center w-full p-3 border border-dashed border-green-500 rounded-md text-green-600 hover:bg-green-50"
                >
                  <PlusCircle size={18} className="mr-2" /> Add Place
                </button>
              </div>
            )}

            {/* Accommodation */}
            {activeSection === 'accommodation' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Building className="mr-2" /> Accommodation
                </h3>

                {accommodations.map((acc, index) => (
                  <div key={acc.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Accommodation #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeAccommodation(acc.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Name</label>
                        <input
                          type="text"
                          value={acc.name}
                          onChange={(e) => updateAccommodation(acc.id, 'name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Hotel/Airbnb name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Type</label>
                        <select
                          value={acc.type}
                          onChange={(e) => updateAccommodation(acc.id, 'type', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select type</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Hostel">Hostel</option>
                          <option value="Airbnb">Airbnb</option>
                          <option value="Resort">Resort</option>
                          <option value="Guesthouse">Guesthouse</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Booking Platform</label>
                        <input
                          type="text"
                          value={acc.bookingPlatform}
                          onChange={(e) => updateAccommodation(acc.id, 'bookingPlatform', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="e.g., Booking.com, Airbnb"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addAccommodation}
                  className="flex items-center justify-center w-full p-3 border border-dashed border-green-500 rounded-md text-green-600 hover:bg-green-50"
                >
                  <PlusCircle size={18} className="mr-2" /> Add Accommodation
                </button>
              </div>
            )}

            {/* Transportation */}
            {activeSection === 'transportation' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Bus className="mr-2" /> Transportation
                </h3>

                {transportations.map((t, index) => (
                  <div key={t.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Transportation #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeTransportation(t.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Type</label>
                        <select
                          value={t.type}
                          onChange={(e) => updateTransportation(t.id, 'type', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select type</option>
                          <option value="Flight">Flight</option>
                          <option value="Train">Train</option>
                          <option value="Bus">Bus</option>
                          <option value="Taxi">Taxi</option>
                          <option value="Rental Car">Rental Car</option>
                          <option value="Ferry">Ferry</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">From</label>
                        <input
                          type="text"
                          value={t.from}
                          onChange={(e) => updateTransportation(t.id, 'from', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Origin"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">To</label>
                        <input
                          type="text"
                          value={t.to}
                          onChange={(e) => updateTransportation(t.id, 'to', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Destination"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Booking Platform</label>
                        <input
                          type="text"
                          value={t.bookingPlatform}
                          onChange={(e) => updateTransportation(t.id, 'bookingPlatform', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="e.g., Expedia, Airline website"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTransportation}
                  className="flex items-center justify-center w-full p-3 border border-dashed border-green-500 rounded-md text-green-600 hover:bg-green-50"
                >
                  <PlusCircle size={18} className="mr-2" /> Add Transportation
                </button>
              </div>
            )}

            {/* Tips */}
            {activeSection === 'tips' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Lightbulb className="mr-2" />
                  Tips
                </h3>

                <div className="mb-6">
                  <label className="flex text-gray-700 font-medium mb-2">
                    <Cloud className="mr-2" />
                    Weather Notes
                  </label>
                  <textarea
                    value={weatherNotes}
                    onChange={(e) => setWeatherNotes(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe the weather conditions during your trip"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="flex text-gray-700 font-medium mb-2">
                    <Shirt className="mr-2" />
                    Tips on Clothing
                  </label>
                  <textarea
                    value={clothingTips}
                    onChange={(e) => setClothingTips(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Share your tips on clothing during your trip."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Budget */}
            {activeSection === 'budget' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <DollarSign className="mr-2" /> Budget
                </h3>

                {budgetItems.map((item, index) => (
                  <div key={item.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Budget Item #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeBudgetItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Category</label>
                        <select
                          value={item.category}
                          onChange={(e) => updateBudgetItem(item.id, 'category', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Select category</option>
                          <option value="Accommodation">Accommodation</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Food">Food</option>
                          <option value="Activities">Activities</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateBudgetItem(item.id, 'description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Description"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Amount</label>
                        <input
                          type="number"
                          value={item.amount}
                          onChange={(e) => updateBudgetItem(item.id, 'amount', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Amount"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addBudgetItem}
                  className="flex items-center justify-center w-full p-3 border border-dashed border-green-500 rounded-md text-green-600 hover:bg-green-50 mb-4"
                >
                  <PlusCircle size={18} className="mr-2" /> Add Budget Item
                </button>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Budget Summary</h4>
                  <p className="text-xl">
                    Total: <span className="font-bold">${totalBudget.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Gallery */}
            {activeSection === 'gallery' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Image className="mr-2" /> Trip Gallery
                </h3>

                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 mb-6"
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-500">Drag & drop photos here, or click to select files</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Upload your trip photos to create a gallery
                  </p>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.url || photo.preview}
                          alt="Trip photo"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            removePhoto(photo.id);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {activeSection !== 'general' && (
                  <button
                    type="button"
                    onClick={navigateToPreviousSection}
                    className="text-green-600 hover:underline"
                  >
                    ← Previous Section
                  </button>
                )}
              </div>

              <div className="flex gap-4">
                {activeSection !== 'gallery' ? (
                  <button
                    type="button"
                    onClick={navigateToNextSection}
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                  >
                    Next Section →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {loading ? 'Saving...' : 'Save Trip'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMyTrip;
