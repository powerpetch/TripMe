import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaUserCircle } from "react-icons/fa";
import "../../App.css";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowRight className="text-3xl text-gray-500" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowLeft className="text-3xl text-gray-500" />
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
    arrows: true,
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
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!testimonialData.length) {
    return <div className="text-center py-10">No testimonials available.</div>;
  }

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <h1 className="text-4xl font-bold opacity-100 translate-y-0 transition-all duration-500 ease-out">
            Testimonial
          </h1>
          <span className="line"></span>
        </div>
        <div className="grid grid-cols-1 max-w-[1300px] mx-auto gap-6 relative opacity-100 translate-y-0 transition-all duration-500 ease-out">
          <Slider {...settings}>
            {testimonialData.map((post, index) => (
              <div className="my-6" key={post._id}>
                <div className="flex flex-col justify-between items-center text-center p-8 mx-4 rounded-xl bg-white relative h-[570px] overflow-hidden">
                  {/* Background circle animation */}
                  <div
                    className={`absolute w-[450px] h-[450px] bg-gray-100 rounded-full left-[30%] top-[40%] -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-700 ease-out ${
                      activeSlide === index ? "scale-100" : "scale-0"
                    }`}
                  />

                  {/* Here we use `post.content` instead of `post.comment` */}
                  <div className="relative z-10 flex-1 flex items-center">
                    <p className="text-2xl font-semibold text-gray-600 leading-relaxed max-w-[80%] mx-auto">
                      {post.content || "No content"}
                    </p>
                  </div>

                  {/* Name & Country */}
                  <div className="relative z-10 flex items-center gap-4 mt-8 self-start ml-40">
                    <img
                      className="rounded-full w-16 h-16 object-cover"
                      src={post.img || "https://picsum.photos/100/100"}
                      alt={`${post.name || "NoName"}'s avatar`}
                    />
                    <div className="flex flex-col items-start">
                      <h1 className="text-xl font-bold">
                        {post.name || "No Name"}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {post.country || "Unknown Country"}
                      </p>
                    </div>
                  </div>

                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0 z-0">
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
