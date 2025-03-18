import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import {
  Trash2,
  SquarePen,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Header from '../homepage/header/header';

const AllTrips = () => {
  const navigate = useNavigate();
  const[trips,setTrips] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fLetterCap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
        setTrips(data);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  fetchTrips();
  }, []);
  console.log(trips)


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }
  };

  const renderTripCards = (trips) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {trips.map((trip, index) => (
          <motion.div
            key={trip._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredCard(trip._id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="relative">
              <img
                src={trip.photos[0]?.url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e"}
                alt={trip.country}
                className="w-full h-56 object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin size={16} className="text-green-400" />
                  <h3 className="text-xl font-bold">{fLetterCap(trip.country)}</h3>
                </div>
                <div className="flex items-center text-sm space-x-2 text-gray-200">
                  <Calendar size={14} />
                  <span>{new Date(trip.travelPeriod.startDate).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/trip/${trip._id}`)}
                  className="flex items-center space-x-2 text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </motion.button>
                <div className="flex items-center space-x-1 text-pink-500">
                  <FaHeart />
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>

              <motion.div 
                className="flex justify-between pt-3 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header />
      {trips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No trips have been created yet.</p>
        </div>
      )}
      <div className="pt-24 max-w-6xl mx-auto w-full px-4">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Explore All Trips</h1>
        {renderTripCards(trips)}
        
      </div>

      
      
    </div>
  )
}

export default AllTrips
