import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaUserCircle } from "react-icons/fa";
import "../../App.css";

const NextArrow = ({ onClick }) => (
  <div
    className="hidden md:block absolute top-1/2 right-[-20px] md:right-[-50px] transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowRight className="text-xl md:text-3xl text-gray-500" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="hidden md:block absolute top-1/2 left-[-20px] md:left-[-50px] transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft className="text-xl md:text-3xl text-gray-500" />
  </div>
);

NextArrow.propTypes = {
  onClick: PropTypes.func,
};

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5001/api/posts", {
          method: "GET",
        });
        const text = await response.text();
        console.log("Raw response text:", text);

        if (text.trim().startsWith("{")) {
          const data = JSON.parse(text);
          console.log("Parsed data:", data);
          // data.data.posts => array of posts
          setTestimonialData(data.data.posts);
        } else {
          console.error("Received non-JSON response:", text);
          setError("Received non-JSON response");
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const settings = {
    dots: true,
    arrows: windowWidth > 768, // Only show arrows on larger screens
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  if (isLoading) {
    return <div className="text-center py-5 md:py-10">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-5 md:py-10 text-red-500">Error: {error}</div>;
  }

  if (!testimonialData.length) {
    return <div className="text-center py-5 md:py-10">No testimonials available.</div>;
  }

  return (
    <div className="py-5 md:py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-20 max-w-[90%] md:max-w-[400px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold opacity-100 translate-y-0 transition-all duration-500 ease-out">
            Testimonial
          </h1>
          <span className="line"></span>
        </div>
        <div className="grid grid-cols-1 w-full max-w-[1300px] mx-auto gap-3 md:gap-6 relative opacity-100 translate-y-0 transition-all duration-500 ease-out">
          <Slider {...settings}>
            {testimonialData.map((post, index) => (
              <div className="my-3 md:my-6" key={post._id}>
                <div className="flex flex-col justify-between items-center text-center p-4 md:p-8 mx-2 md:mx-4 rounded-xl bg-white relative h-[400px] md:h-[570px] overflow-hidden">
                  {/* Background circle animation */}
                  <div
                    className={`absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-gray-100 rounded-full left-[50%] md:left-[30%] top-[40%] -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-700 ease-out ${
                      activeSlide === index ? "scale-100" : "scale-0"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex items-center">
                    <p className="text-lg md:text-2xl font-semibold text-gray-600 leading-relaxed max-w-[95%] md:max-w-[80%] mx-auto">
                      {post.content || "No content"}
                    </p>
                  </div>

                  {/* Name & Country */}
                  <div className="relative z-10 flex items-center gap-2 md:gap-4 mt-4 md:mt-8 self-center md:self-start md:ml-40">
                    <img
                      className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover"
                      src={post.img || "https://picsum.photos/100/100"}
                      alt={`${post.name || "NoName"}'s avatar`}
                    />
                    <div className="flex flex-col items-start">
                      <h1 className="text-lg md:text-xl font-bold">
                        {post.name || "No Name"}
                      </h1>
                      <p className="text-xs md:text-sm text-gray-500">
                        {post.country || "Unknown Country"}
                      </p>
                    </div>
                  </div>

                  <p className="text-black/20 text-6xl md:text-9xl font-serif absolute top-0 right-0 z-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;