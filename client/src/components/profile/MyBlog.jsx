import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaHeart,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import {
  Trash2,
  SquarePen,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Header from "../homepage/header/OtherHeader";
import "../TripTGT/Loader.css";

function MyBlog() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("created");
  const [hoveredCard, setHoveredCard] = useState(null);

  const fLetterCap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/user/trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setTrips(data);
        } else {
          throw new Error(data.message || "Failed to fetch trips");
        }
      } catch (err) {
        console.error("Fetch trips error:", err);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
        } else {
          throw new Error(data.message || "Could not fetch user profile");
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="loader"></div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">No user found. Please Sign In first.</p>
      </div>
    );
  }
  

  const handleDelete = async (tripId) => {
    setLoading(true)
    if (window.confirm("Are you sure you want to delete this trip?")) {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/${tripId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false)
        if (res.ok) {
          setTrips(trips.filter(trip => trip._id !== tripId));
        } else {
          throw new Error("Failed to delete trip");
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete trip");
      }
    }
  };

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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/edit-trip/${trip._id}`)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <SquarePen size={16} />
                  <span>Edit</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, color: "#EF4444" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(trip._id)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    );
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600 text-lg"
        >
          No user found. Please Sign In first.
        </motion.p>
      </div>
    );
  }

  const avatarUrl = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${process.env.REACT_APP_API_BASE_URL}${user.avatar}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <Header user={user} avatarUrl={avatarUrl} />

      <div className="pt-24 max-w-6xl mx-auto w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 mb-8"
        >
          <span
            onClick={() => navigate("/profile")}
            className="text-green-600 text-2xl font-bold cursor-pointer hover:underline"
          >
            My Profile
          </span>
          <span className="text-2xl text-gray-400">{">"}</span>
          <span className="text-2xl font-bold text-gray-700">Blog</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-6xl" />
              )}
            </motion.div>

            <div className="mt-4 sm:mt-0 sm:ml-6 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-800 sm:text-center lg:text-left">
                {user.username || "Unnamed"}
              </h2>
              <p className="text-gray-600">
                {user.city || "Unknown City"}, {user.country || "Unknown Country"}
              </p>
              <div className="flex justify-center sm:justify-start space-x-4 mt-2">
                {user.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                )}
                {user.facebook && (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaFacebook size={20} />
                  </motion.a>
                )}
                {user.instagram && (
                  <motion.a
                    whileHover={{ scale: 1.2 }}
                    href={user.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-600"
                  >
                    <FaInstagram size={20} />
                  </motion.a>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create")}
              className="mt-4 sm:mt-0 sm:ml-auto px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              + Create Trip
            </motion.button>
          </div>
        </motion.div>

        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-4"
          >
            {["created", "liked"].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab === "created" ? "My Trips" : "Liked Trips"}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {activeTab === "created" ? renderTripCards(trips) : renderTripCards([])}
      </div>
    </div>
  );
}

export default MyBlog;