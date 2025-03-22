import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserCircle,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import logoGreen from "../../images/new-logo-green.png";

function PublicProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [publicUser, setPublicUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("created");
  const [trips, setTrips] = useState([]); // State to store trips

  // Fetch currentUser (logged-in user)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // If not logged in, do nothing
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch((err) => console.error("Fetch currentUser error:", err));
  }, []);

  // Fetch publicUser (Profile of the user with username)
  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/public/${username}`);
        const data = await res.json();
        if (res.ok && data.user) {
          setPublicUser(data.user);

          // Now fetch the trips of the public user
          const tripsRes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/trips/user/${data.user.username}`);
          const tripsData = await tripsRes.json();
          if (tripsRes.ok && tripsData) {
            setTrips(tripsData); // Set trips to display in frontend
          } else {
            console.error(tripsData.message);
          }
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Fetch public profile error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loader"></span>
      </div>
    );
  }

  if (!publicUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">User not found.</p>
      </div>
    );
  }

  // Check if the URL is full or not (http:// or https://)
  const getFullUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${process.env.REACT_APP_API_BASE_URL}${url}`;
  };

  const coverUrl = getFullUrl(publicUser.cover) || "https://picsum.photos/1200/400?grayscale";
  const avatarUrl = getFullUrl(publicUser.avatar);

  const currentAvatar = currentUser?.avatar
    ? getFullUrl(currentUser.avatar)
    : null;
  const currentUsername = currentUser?.username || "Guest";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-16 bg-white shadow px-4 flex items-center justify-between fixed w-full top-0 left-0 z-50">
        <div className="flex items-center">
          <img
            src={logoGreen}
            alt="Logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <nav className="flex items-center space-x-4">
          {currentUser ? (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-1 rounded-full transition-colors"
            >
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-gray-500 text-2xl" />
              )}
              <span className="text-gray-700 font-medium">{currentUsername}</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {/* Container */}
      <div className="pt-16 flex justify-center">
        <div className="max-w-5xl w-full">
          {/* Cover */}
          <div className="bg-gray-200 relative h-48 overflow-hidden">
            <img
              src={coverUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Avatar and publicUser data */}
          <div className="px-4">
            <div className="relative flex flex-col sm:flex-row items-center mb-6">
              {/* Avatar */}
              <div className="flex-shrink-0 -mt-12 sm:-mt-16">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 w-full h-full" />
                  )}
                </div>
              </div>
              {/* user info */}
              <div className="sm:ml-4 mt-4 sm:mt-0">
                <h2 className="text-2xl font-bold text-gray-800">
                  {publicUser.username || "Unnamed"}
                </h2>
                <p className="text-gray-500">
                  {publicUser.city || "Unknown City"},{" "}
                  {publicUser.country || "Unknown Country"}
                </p>
                <p className="text-gray-500">
                  {publicUser.email || "No email"}
                </p>
                {/* Social Icons */}
                <div className="flex space-x-3 mt-2">
                  {publicUser.twitter && (
                    <a
                      href={publicUser.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {publicUser.facebook && (
                    <a
                      href={publicUser.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      <FaFacebook size={20} />
                    </a>
                  )}
                  {publicUser.instagram && (
                    <a
                      href={publicUser.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:underline"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-300 mb-4">
              <button
                onClick={() => setActiveTab("created")}
                className={`
                  px-4 py-2
                  ${
                    activeTab === "created"
                      ? "bg-green-600 text-white rounded-t-md"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                Trips Created
              </button>
              {/* <button
                onClick={() => setActiveTab("liked")}
                className={`
                  px-4 py-2
                  ${
                    activeTab === "liked"
                      ? "bg-green-600 text-white rounded-t-md"
                      : "bg-transparent text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                Liked Trips
              </button> */}
            </div>

            {/* Display created trips */}
            <div className="text-gray-700">
              {activeTab === "created" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {trips.length === 0 ? (
                    <p>No trips created yet.</p>
                  ) : (
                    trips.map((trip) => (
                      <div
                        key={trip._id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={trip.photos[0]?.url ||"https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                          alt={trip.country}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">{trip.country}</h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(trip.travelPeriod.startDate).toLocaleDateString()} - {new Date(trip.travelPeriod.endDate).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => navigate(`/trip/${trip._id}`)}
                          className="mt-2 text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;
