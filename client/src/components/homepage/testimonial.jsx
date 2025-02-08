import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../../App.css';

const testimonialData = [
  {
    id: 1,
    name: "Samuel",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
    rating: 4,
  },
  {
    id: 3,
    name: "Smith",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
    rating: 3,
  },
];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 right-[-50px] transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
      <FaArrowRight className="text-3xl text-gray-500" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
      <FaArrowLeft className="text-3xl text-gray-500" />
    </div>
  );
};

const Testimonial = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (sliderRef.current) observer.observe(sliderRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (sliderRef.current) observer.unobserve(sliderRef.current);
    };
  }, []);

  var settings = {
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

  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <h1 
            ref={headerRef}
            className="text-4xl font-bold opacity-0 translate-y-10 transition-all duration-500 ease-out"
          >
            Testimonial
          </h1>
          <span className="line"></span>
        </div>
        <div
          ref={sliderRef}
          className="grid grid-cols-1 max-w-[1300px] mx-auto gap-6 relative opacity-0 translate-y-10 transition-all duration-500 ease-out"
        >
          <Slider {...settings}>
            {testimonialData.map((data, index) => (
              <div className="my-6" key={data.id}>
                <div className="flex flex-col justify-between items-center text-center p-8 mx-4 rounded-xl bg-white relative h-[570px] overflow-hidden">
                  {/* Large Background Circle */}
                  <div 
                    className={`absolute w-[450px] h-[450px] bg-gray-100 rounded-full left-[30%] top-[40%] -translate-x-1/2 -translate-y-1/2 transform scale-0 transition-transform duration-700 ease-out
                      ${activeSlide === index ? 'scale-100' : 'scale-0'}`}
                  />
                  
                  {/* Quote Text */}
                  <div className="relative z-10 flex-1 flex items-center">
                    <p className="text-2xl font-semibold text-gray-600 leading-relaxed max-w-[80%] mx-auto">
                      {data.text}
                    </p>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="relative z-10 flex items-center gap-4 mt-8 self-start ml-40">
                    <img
                      className="rounded-full w-16 h-16 object-cover"
                      src={data.img}
                      alt=""
                    />
                    <div className="flex flex-col items-start">
                      <h1 className="text-xl font-bold">{data.name}</h1>
                      <div className="flex gap-1">
                        {[...Array(data.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                      </div>
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