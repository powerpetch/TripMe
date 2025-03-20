import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่ม import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../../App.css";
import "./rec_place.css";

import User1 from "../../../assets/Mount-Fuji.jpg";
import User2 from "../../../assets/Sydney.jpg";
import User3 from "../../../assets/paris.jpg";
import User4 from "../../../assets/new-york.jpg";
import User5 from "../../../assets/phuket.jpg";
import User6 from "../../../assets/china.webp";
import User7 from "../../../assets/venice.jpeg";

const Blog = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate(); // เตรียมใช้ navigate

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const handleViewMore = (searchKeyword) => {
    navigate(`/trips?search=${encodeURIComponent(searchKeyword)}`);
  };

  return (
    <section className="testimonial section-padding" data-scroll-index="4">
      <div className="container__blog">
        <div className="text-4xl section-header text-center">
          <h3 ref={headerRef}>Explore the Beautiful Places</h3>
          <span className="line"></span>
        </div>

        <div className="swiper-container-wrapper">
          <div className="swiper-button-prev custom-nav"></div>
          <div className="swiper-button-next custom-nav"></div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={5}
            slidesPerView={4}
            slidesPerGroup={1}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next'
            }}
            grabCursor={true}
            pagination={{ el: ".swiper-pagination", clickable: true, dynamicBullets: true }}
            loop
            className="swiper-container"
            breakpoints={{
              300: { slidesPerView: 1 },
              855: { slidesPerView: 2 },
              1149: { slidesPerView: 3 },
              1448: { slidesPerView: 4 },
            }}
          >
            {/* Mount Fuji */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User1} alt="Mount Fuji" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Mount Fuji, Japan</h3>
                  <p className="description">12,388 ft active volcano. Best visited Mar-May or Sep-Nov.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("japan")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* Sydney */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User2} alt="Sydney Opera House" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sydney, Australia</h3>
                  <p className="description">Iconic harbor city. Opera House & beaches. Perfect Dec-Feb.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("australia")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* Paris */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User3} alt="Paris Eiffel Tower" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Paris, France</h3>
                  <p className="description">City of Light. Art, cuisine & culture. Best Apr-Jun.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("france")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* New York */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User4} alt="New York City" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">New York City, USA</h3>
                  <p className="description">The Big Apple. Shopping, Broadway & Central Park.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("usa")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* Phuket */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User5} alt="Phuket Beach" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Phuket, Thailand</h3>
                  <p className="description">Tropical paradise. Beaches & nightlife. Best Nov-Apr.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("thailand")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* Great Wall */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User6} alt="Great Wall of China" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Great Wall, China</h3>
                  <p className="description">21,196 km ancient wonder. Mutianyu section popular.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("china")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>

            {/* Venice */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User7} alt="Venice Canals" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Venice, Italy</h3>
                  <p className="description">City of canals. 417 bridges, gondolas & waterways.</p>
                  <button
                    className="button"
                    onClick={() => handleViewMore("italy")}
                  >
                    View More
                  </button>
                </div>
              </article>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
