import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHeart,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import logoGreen from "../../images/new-logo-green.png";
import Header from "../homepage/header/OtherHeader";

function MyBlog() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // state for tab (created / liked)
  const [activeTab, setActiveTab] = useState("created");

  // blog/mock
  const [createdBlogs] = useState([
    {
      id: 1,
      title: "Trip to Thailand",
      imageUrl: "https://picsum.photos/400/250?random=1",
      excerpt: "Amazing trip in Bangkok and Chiang Mai",
      likes: 5,
    },
    {
      id: 2,
      title: "Australia Journey",
      imageUrl: "https://picsum.photos/400/250?random=2",
      excerpt: "Exploring Sydney and Melbourne",
      likes: 10,
    },
    {
      id: 3,
      title: "Trip to Italy",
      imageUrl: "https://picsum.photos/400/250?random=3",
      excerpt: "Visiting Rome and Florence",
      likes: 8,
    },
  ]);
  const [likedBlogs] = useState([
    {
      id: 101,
      title: "Japan Discovery",
      imageUrl: "https://picsum.photos/400/250?random=4",
      excerpt: "Tokyo and Kyoto are wonderful",
      likes: 15,
    },
    {
      id: 102,
      title: "Switzerland Mountains",
      imageUrl: "https://picsum.photos/400/250?random=5",
      excerpt: "Alps, nature, and winter sports",
      likes: 7,
    },
  ]);

  // profile user
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
        <p className="text-gray-600 text-lg">Loading...</p>
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

  // render card
  const renderBlogCards = (blogs) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg shadow bg-white">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-base font-bold text-gray-800">{blog.title}</h4>
              <p className="text-sm text-gray-600 mt-1 mb-3">{blog.excerpt}</p>
              <div className="flex items-center justify-between">
                <button
                  // onClick={() => alert(`Read more about: ${blog.title}`)}
                  className="
                    px-3 py-1 
                    text-sm text-white 
                    bg-blue-500 
                    rounded-full 
                    hover:bg-blue-600
                    focus:outline-none 
                    transition-colors
                  "
                >
                  Read More
                </button>

                <div className="flex items-center text-pink-500">
                  <FaHeart className="mr-1" />
                  <span className="text-sm">{blog.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // avatar url 
  const avatarUrl = user.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${process.env.REACT_APP_API_BASE_URL}${user.avatar}`
    : null;

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <Header user={user} avatarUrl={avatarUrl} />

      {/* Content */}
      <div className="pt-20 max-w-5xl mx-auto w-full px-4">
        {/* breadcrumb / heading */}
        <div className="flex items-center space-x-2 mb-6">
          <span
            onClick={() => navigate("/profile")}
            className="text-green-600 text-2xl font-bold cursor-pointer hover:underline"
          >
            My Profile
          </span>
          <span className="text-2xl text-gray-400">{">"}</span>
          <span className="text-2xl font-bold text-gray-700">Blog</span>
        </div>

        {/* info user */}
        <div className="flex flex-col sm:flex-row items-center mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border mr-4"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-6xl mr-4" />
          )}
          <div className="mt-2 sm:mt-0">
            {/* user name */}
            <h2 className="text-xl font-bold text-gray-800">
              {user.username || "Unnamed"}
            </h2>

            {/* location + social */}
            <div className="text-sm text-gray-500">
              <p>
                {user.city || "Unknown City"},{" "}
                {user.country || "Unknown Country"}
              </p>
              <div className="flex space-x-3 mt-1">
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <FaTwitter />
                  </a>
                )}
                {user.facebook && (
                  <a
                    href={user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    <FaFacebook />
                  </a>
                )}
                {user.instagram && (
                  <a
                    href={user.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Create */}
          <button
            onClick={() => navigate("/create")}
            className="
              mt-4 sm:mt-0 sm:ml-auto
              px-4 py-2 
              bg-green-600 
              text-white 
              rounded 
              hover:bg-green-700
              transition-colors
            "
          >
            + CREATE
          </button>
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
          <button
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
          </button>
        </div>

        {/* Show Cards */}
        {activeTab === "created"
          ? renderBlogCards(createdBlogs)
          : renderBlogCards(likedBlogs)}
      </div>
    </div>
  );
}

export default MyBlog;
