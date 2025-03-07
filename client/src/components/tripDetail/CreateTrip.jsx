import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';
import Header2 from '../homepage/header/OtherHeader';
// import { format } from 'date-fns';
import { 
  Menu, X, MapPin, Building, Bus, 
  Cloud, DollarSign, Image, PlusCircle, Trash2, Shirt, Lightbulb
} from 'lucide-react';
import { FaCalendarAlt } from 'react-icons/fa';

import "react-datepicker/dist/react-datepicker.css";
import logoGreen from '../../images/new-logo-green.png';

import Header from '../homepage/header/header';

const CreateMyTrip = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // state for user
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    // ดึง token
    const token = localStorage.getItem("token");
    // console.log(token)
    if (!token) {
      // console.log("NOTOKEN")
      navigate("/login");
      return;
    }

    // เรียก API เพื่อนำข้อมูล user (รวม avatar) มาใช้
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Response status:", res.status); 
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          // ตรวจสอบ avatar
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
  
  // Form state
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
  
  // Current section
  const [activeSection, setActiveSection] = useState('general');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle visited places
  const addVisitedPlace = () => {
    const newPlace = {
      id: Date.now().toString(),
      name: '',
      description: ''
    };
    setVisitedPlaces([...visitedPlaces, newPlace]);
  };

  const updateVisitedPlace = (id, field, value) => {
    setVisitedPlaces(visitedPlaces.map(place => 
      place.id === id ? { ...place, [field]: value } : place
    ));
  };

  const removeVisitedPlace = (id) => {
    setVisitedPlaces(visitedPlaces.filter(place => place.id !== id));
  };

  // Handle accommodations
  const addAccommodation = () => {
    const newAccommodation = {
      id: Date.now().toString(),
      name: '',
      type: '',
      bookingPlatform: '',
    //   cost: ''
    };
    setAccommodations([...accommodations, newAccommodation]);
  };

  const updateAccommodation = (id, field, value) => {
    setAccommodations(accommodations.map(accommodation => 
      accommodation.id === id ? { ...accommodation, [field]: value } : accommodation
    ));
  };

  const removeAccommodation = (id) => {
    setAccommodations(accommodations.filter(accommodation => accommodation.id !== id));
  };

  // Handle transportation
  const addTransportation = () => {
    const newTransportation = {
      id: Date.now().toString(),
      type: '',
      from: '',
      to: '',
      bookingPlatform: '',
    //   cost: ''
    };
    setTransportations([...transportations, newTransportation]);
  };

  const updateTransportation = (id, field, value) => {
    setTransportations(transportations.map(transportation => 
      transportation.id === id ? { ...transportation, [field]: value } : transportation
    ));
  };

  const removeTransportation = (id) => {
    setTransportations(transportations.filter(transportation => transportation.id !== id));
  };

  // Handle budget items
  const addBudgetItem = () => {
    const newBudgetItem = {
      id: Date.now().toString(),
      category: '',
      description: '',
      amount: ''
    };
    setBudgetItems([...budgetItems, newBudgetItem]);
  };

  const updateBudgetItem = (id, field, value) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeBudgetItem = (id) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  // Handle photo uploads
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      const newPhotos = acceptedFiles.map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        uploaded: false,
        url: null,
        public_id: null
      }));
      setPhotos([...photos, ...newPhotos]);
    }
  });


  const removePhoto = (id) => {
    const photoToRemove = photos.find(photo => photo.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const navigateToNextSection = (e) => {
    e.preventDefault(); // Prevent form submission
    const sections = ['general', 'places', 'accommodation', 'transportation', 'tips', 'budget', 'gallery'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const navigateToPreviousSection = (e) => {
    e.preventDefault(); // Prevent form submission
    const sections = ['general', 'places', 'accommodation', 'transportation', 'tips', 'budget', 'gallery'];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };


  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // console.log({
    //   country,
    //   travelPeriod: { startDate, endDate },
    //   visitedPlaces,
    //   accommodations,
    //   transportations,
    //   weatherNotes,
    //   clothingTips,
    //   budgetItems,
    //   photos: photos.map(photo => photo.file)
    // });
    const formData = new FormData();
    formData.append('country', country);
    formData.append('travelPeriod', JSON.stringify({ startDate, endDate }));
    formData.append('visitedPlaces', JSON.stringify(visitedPlaces));
    formData.append('accommodations', JSON.stringify(accommodations));
    formData.append('transportations', JSON.stringify(transportations));
    formData.append('weatherNotes', weatherNotes);
    formData.append('clothingTips', clothingTips);
    formData.append('budgetItems', JSON.stringify(budgetItems));

    photos.forEach(photo => {
      formData.append('photos', photo.file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      } else {
        navigate(data.redirectUrl);
      }

      
      console.log('Trip created:', data);
      alert('Trip created successfully! Click ok to view your Trip');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // End the loading state
    }
  };
    // Reset form or navigate to another page


  // Calculate total budget
  const totalBudget = budgetItems.reduce((sum, item) => {
    const amount = parseFloat(item.amount) || 0;
    return sum + amount;
  }, 0);

  

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header2 user={user} avatarUrl={avatarURL} />

      {/* Main Content */}
      <div className="flex-1 pt-20 p-4 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg mt-4">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Create My Trip</h2>
          
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
            {/* General Section */}
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
                      {!startDate && (<FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />)}

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
                      {!endDate && (<FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />)}
                      </div>
                      
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-gray-600">
                  {startDate && endDate ? (
                    (() => {
                    // Calculate the duration in days
                    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                    
                    // Check if the duration is zero and return the appropriate message
                    return durationInDays === 0
                    ? 'Trip duration: Less than a day'
                    : durationInDays === 1
                    ? `Trip duration: ${durationInDays} day`
                    : `Trip duration: ${durationInDays} days`;
                })()
                ) : (
                'Please select both start and end dates to see trip duration'
                )}
                  </p>
                </div>
              </div>
            )}
            
            {/* Visited Places Section */}
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
            
            {/* Accommodation Section */}
            {activeSection === 'accommodation' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Building className="mr-2" /> Accommodation
                </h3>
                
                {accommodations.map((accommodation, index) => (
                  <div key={accommodation.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Accommodation #{index + 1}</h4>
                      <button 
                        type="button"
                        onClick={() => removeAccommodation(accommodation.id)}
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
                          value={accommodation.name}
                          onChange={(e) => updateAccommodation(accommodation.id, 'name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Hotel/Airbnb name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Type</label>
                        <select
                          value={accommodation.type}
                          onChange={(e) => updateAccommodation(accommodation.id, 'type', e.target.value)}
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
                          value={accommodation.bookingPlatform}
                          onChange={(e) => updateAccommodation(accommodation.id, 'bookingPlatform', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="e.g., Booking.com, Airbnb"
                        />
                      </div>
                      
                      {/* <div>
                        <label className="block text-gray-600 text-sm mb-1">Cost</label>
                        <input
                          type="text"
                          value={accommodation.cost}
                          onChange={(e) => updateAccommodation(accommodation.id, 'cost', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Cost in your currency"
                        />
                      </div> */}
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
            
            {/* Transportation Section */}
            {activeSection === 'transportation' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Bus className="mr-2" /> Transportation
                </h3>
                
                {transportations.map((transportation, index) => (
                  <div key={transportation.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Transportation #{index + 1}</h4>
                      <button 
                        type="button"
                        onClick={() => removeTransportation(transportation.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Type</label>
                        <select
                          value={transportation.type}
                          onChange={(e) => updateTransportation(transportation.id, 'type', e.target.value)}
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
                          value={transportation.from}
                          onChange={(e) => updateTransportation(transportation.id, 'from', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Origin"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">To</label>
                        <input
                          type="text"
                          value={transportation.to}
                          onChange={(e) => updateTransportation(transportation.id, 'to', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Destination"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Booking Platform</label>
                        <input
                          type="text"
                          value={transportation.bookingPlatform}
                          onChange={(e) => updateTransportation(transportation.id, 'bookingPlatform', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="e.g., Expedia, Airline website"
                        />
                      </div>
                      
                      {/* <div>
                        <label className="block text-gray-600 text-sm mb-1">Cost</label>
                        <input
                          type="text"
                          value={transportation.cost}
                          onChange={(e) => updateTransportation(transportation.id, 'cost', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Cost in your currency"
                        />
                      </div> */}
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
            
            {/* Tips Section */}
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
                    Tips on Clothing</label>
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
            
            {/* Budget Section */}
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
                  <p className="text-xl">Total: <span className="font-bold">${totalBudget.toFixed(2)}</span></p>
                </div>
              </div>
            )}
            
            {/* Gallery Section */}
            {activeSection === 'gallery' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                  <Image className="mr-2" /> Trip Gallery
                </h3>
                
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 mb-6">
                  <input {...getInputProps()} />
                  <p className="text-gray-500">Drag & drop photos here, or click to select files</p>
                  <p className="text-sm text-gray-400 mt-2">Upload your trip photos to create a gallery</p>
                </div>
                
                {photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <img
                          src={photo.preview}
                          alt="Trip photo"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-100 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={20}/>
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
                    type="button" // Explicitly set type to button
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
                    type="button" // Explicitly set type to button
                    onClick={navigateToNextSection}
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                  >
                    Next Section →
                  </button>
                ) : (
                  <button
                    type="submit" disabled={loading}// This button should submit the form
                    className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                  {loading ? 'Creating Trip...' : 'Save Trip'}
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

export default CreateMyTrip;