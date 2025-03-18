import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import logoGreen from '../../images/new-logo-green.png';
import Header from "../homepage/header/header";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Building,
  Bus,
  Cloud,
  DollarSign,
  Image,
  Calendar,
  Shirt
} from 'lucide-react';

const TripDetailsShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fLetterCap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        if (!id) throw new Error("Trip ID is undefined");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trip details');
        }
        const data = await response.json();
        console.log('Fetched trip details:', data);
        setTrip(data);
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError(err.message || 'Failed to load trip details');
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error || 'Trip not found'}</p>
        </div>
      </div>
    );
  }

  const totalBudget = trip.budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      {/* Modal for full-size image */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          // onClick={() => setActiveImage(null)}
        >
          <div className="max-w-4xl w-full relative">
            {/* Close Button using Lucide X Icon */}
            <button
              className="absolute top-4 right-4 text-white z-10"
              onClick={() => setActiveImage(null)} // Close modal when clicked
            >
              <X size={32} color="white" className="border-2 border-white p-2 bg-gray-500 rounded-full"/> 
            </button>
           
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
              onClick={() => {
                setActiveImageIndex((prevIndex) => 
                  prevIndex === 0 ? trip.photos.length - 1 : prevIndex - 1
                );
                setActiveImage(trip.photos[activeImageIndex === 0 ? trip.photos.length - 1 : activeImageIndex - 1].url);
              }}
            >
              <ChevronLeft size={32} color="white" className="border-2 border-white p-2 bg-gray-500 rounded-full"/>
            </button>

            <div className="w-full h-auto">
              <img 
                src={activeImage} 
                alt="Trip photo" 
                className="w-full h-auto rounded-lg" 
              />
            </div>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50"
              onClick={() => {
                setActiveImageIndex((prevIndex) => 
                  prevIndex === trip.photos.length - 1 ? 0 : prevIndex + 1
                );
                setActiveImage(trip.photos[activeImageIndex === trip.photos.length - 1 ? 0 : activeImageIndex + 1].url);
              }}
            >
              <ChevronRight size={32} color="white" className="border-2 border-white p-2 bg-gray-500 rounded-full" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 mt-3">
          <div className="relative h-64">
            {trip.photos[0] && (
              <img
                src={trip.photos[0].url}
                alt={trip.country}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{fLetterCap(trip.country)}</h1>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {format(new Date(trip.travelPeriod.startDate), 'MMM d, yyyy')} - {format(new Date(trip.travelPeriod.endDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Visited Places */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-700">
                <MapPin className="mr-2" /> Places Visited
              </h2>
              <div className="space-y-4">
                {trip.visitedPlaces.map((place) => (
                  <div key={place._id} className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-xl font-medium">{fLetterCap(place.name)}</h3>
                    {place.description && (
                      <p className="text-gray-600 mt-1">{fLetterCap(place.description)}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Accommodations */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-700">
                <Building className="mr-2" /> Accommodations
              </h2>
              <div className="grid gap-4">
                {trip.accommodations.map((accommodation) => (
                  <div key={accommodation._id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium">{fLetterCap(accommodation.name)}</h3>
                    <div className="mt-2 text-gray-600">
                      {accommodation.type && (
                        <p>Type: {accommodation.type}</p>
                      )}
                      {accommodation.bookingPlatform && (
                        <p>Booked via: {fLetterCap(accommodation.bookingPlatform)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Transportation */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-700">
                <Bus className="mr-2" /> Transportation
              </h2>
              <div className="space-y-4">
                {trip.transportations.map((transport) => (
                  <div key={transport._id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{transport.type}</span>
                      {transport.bookingPlatform && (
                        <span className="text-gray-500 text-sm">
                          via {fLetterCap(transport.bookingPlatform)}
                        </span>
                      )}
                    </div>
                    {(transport.from || transport.to) && (
                      <div className="mt-2 text-gray-600">
                        {transport.from && <span>From: {fLetterCap(transport.from)}</span>}
                        {transport.from && transport.to && <span> → </span>}
                        {transport.to && <span>To: {fLetterCap(transport.to)}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weather and Tips */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 flex items-center text-green-700">
                  <Cloud className="mr-2" /> Weather Notes
                </h2>
                <p className="text-gray-600">{fLetterCap(trip.weatherNotes)}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center text-green-700">
                  <Shirt className="mr-2" /> Clothing Tips
                </h2>
                <p className="text-gray-600">{fLetterCap(trip.clothingTips)}</p>
              </div>
            </section>

            {/* Budget Summary */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                <DollarSign className="mr-2" /> Budget Summary
              </h2>
              <div className="space-y-3">
                {trip.budgetItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {item.category || 'Uncategorized'}
                      {item.description && ` - ${fLetterCap(item.description)}`}
                    </span>
                    <span className="font-medium">${item.amount}</span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">${totalBudget}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Photo Gallery */}
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-green-700">
                <Image className="mr-2" /> Photo Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {trip.photos.map((photo,index) => (
                  <div 
                    key={photo._id} 
                    className="cursor-pointer"
                    onClick={() => {
                      setActiveImage(photo.url);
                      setActiveImageIndex(index);}
                      
                    }
                      
                  >
                    <img
                      src={photo.url}
                      alt="Trip memory"
                      className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsShow;