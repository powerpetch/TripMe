import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../App.css";
import "./blog.css";

import User1 from "../images/user1.jpg";
import User2 from "../images/user2.jpg";
import User3 from "../images/user3.jpg";

import arrowLeft from "../images/arrow-left.png";
import arrowRight from "../images/arrow-right.png";

const Blog = () => (
  <section className="testimonial section-padding" data-scroll-index="4">
    <div className="container">
      <div className="section-header text-center">
        <h3>Testimonials</h3>
        <span className="line"></span>
        <p>
          Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra.
          Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.
        </p>
      </div>

      <div className="swiper-container-wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          slidesPerGroup={1}
          navigation={{ prevEl: ".left-arrow", nextEl: ".right-arrow" }}
          pagination={{ clickable: true }}
          loop
          className="swiper-container"
        >
          {/* Slide 1 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User1} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User2} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User1} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User3} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User2} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide>
          <article class ="card-article">
            <div class="card-image">
              <img src={User3} alt="" class="card-img"/>
            </div>

            <div class="card-data">
              <h3 class="name">dfnjweevrfvjn hagbdr</h3>
              <p class="description">avwoeiwur8ioaweyrnv </p>

              <button className="button">View More</button>
            </div>
          </article>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-pagination"></div>
        {/* <img className="swiper-button-prev" src={arrowLeft} alt="arrow-left" /> */}
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
        {/* <img className="swiper-button-next" src={arrowRight} alt="arrow-right" /> */}
      </div>
    </div>
  </section>
);

export default Blog;
