import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { 
  Trash2,
  SquarePen,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Header from '../homepage/header/header';


function fLetterCap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ฟังก์ชัน shuffle array (สำหรับ sort แบบ random)
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const AllTrips = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [trips, setTrips] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----- Search & Sort -----
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("random");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

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

  const filteredTrips = useMemo(() => {
    return trips.filter(trip =>
      trip.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [trips, searchTerm]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    }
  };

  const renderTripCards = (tripList) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {tripList.map((trip, index) => (
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
                  <span>
                    {new Date(trip.travelPeriod.startDate).toLocaleDateString()}
                  </span>
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
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span class="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header />
      {trips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No trips have been created yet.</p>
        </div>
      )}

      <div className="pt-24 max-w-6xl mx-auto w-full px-4">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Explore All Trips
        </h1>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          {/* Search Bar */}
          <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
            <input
              type="text"
              placeholder="Search by country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {/* Sort Dropdown */}
          <div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="random">Random</option>
              <option value="dateAsc">Date Ascending</option>
              <option value="dateDesc">Date Descending</option>
              <option value="countryAsc">Country A-Z</option>
              <option value="countryDesc">Country Z-A</option>
            </select>
          </div>
        </div>

        {/* Render Trips with filter & sort */}
        {filteredTrips.length > 0 ? (
        renderTripCards(filteredTrips)
      ) : (
        <p>No matching trips found.</p>
      )}
      </div>
    </div>
  );
};

export default AllTrips;
