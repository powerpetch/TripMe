import React, { useEffect, useRef } from "react";
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

const Blog = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: 0.1
      }
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
            pagination={{el: ".swiper-pagination", clickable: true, dynamicBullets: true}}
            loop
            className="swiper-container"
            breakpoints={{
              300: {slidesPerView: 1},
              855: {slidesPerView: 2},
              1149: {slidesPerView: 3},
              1448: {slidesPerView: 4},
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User1} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User2} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User1} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 4 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User3} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 5 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User2} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 6 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User3} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
                </div>
              </article>
            </SwiperSlide>

            {/* Slide 7 */}
            <SwiperSlide>
              <article className="card-article">
                <div className="card-image">
                  <img src={User2} alt="" className="card-img"/>
                </div>
                <div className="card-data">
                  <h3 className="name">Sed quis</h3>
                  <p className="description">Lorem ipsum dolor sit amet consectetur.</p>
                  <button className="button">View More</button>
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

// const CardSlider = () => {
//   return (
//     <main>
// 		<div className="blog">
// 			<Swiper
// 				modules={[Pagination]}
// 				grabCursor={true}
// 				initialSlide={2}
// 				centeredSlides={true}
// 				slidesPerView="auto"
// 				speed={800}
// 				slideToClickedSlide={true}
// 				pagination={{ el: ".swiper-pagination" , clickable: true}}
// 				breakpoints={{
// 					320: {slidesPerView: 40,},
// 					430: {slidesPerView: 50,},
// 					580: {slidesPerView: 70,},
// 					650: {slidesPerView: 30,},
// 				}}>
// 				<SwiperSlide className="swiper-slide slide-1">
// 					<div className="title">
// 						<h1>Slide 1</h1>
// 					</div>
// 					<div className="content">
// 						<div className="score">4.8</div>
// 						<div className="text">
// 							<h2>Slide 1</h2>
// 							<p>
// 								Lorem ipsum dolor sit amet, 
// 								consectetur adipiscing elit. 
// 								Sed ac urna eget nunc vestibulum
// 							</p>
// 						</div>
// 						<div className="genre">
// 							<span style={{ "--i": 1 }}>Drama</span>
// 							<span style={{ "--i": 2 }}>Action</span>  
// 						</div>
// 					</div>
// 				</SwiperSlide> 

// 				<SwiperSlide className="swiper-slide slide-2">
// 					<div className="title">
// 						<h1>Slide 2</h1>
// 					</div>
// 					<div className="content">
// 						<div className="score">4.8</div>
// 						<div className="text">
// 							<h2>Slide 2</h2>
// 							<p>
// 								Lorem ipsum dolor sit amet, 
// 								consectetur adipiscing elit. 
// 								Sed ac urna eget nunc vestibulum
// 							</p>
// 						</div>
// 						<div className="genre">
// 							<span style={{ "--i": 1 }}>Drama</span>
// 							<span style={{ "--i": 2 }}>Action</span>  
// 						</div>
// 					</div>
// 				</SwiperSlide> 

// 				<SwiperSlide className="swiper-slide slide-3">
// 					<div className="title">
// 						<h1>Slide 3</h1>
// 					</div>
// 					<div className="content">
// 						<div className="score">4.8</div>
// 						<div className="text">
// 							<h2>Slide 3</h2>
// 							<p>
// 								Lorem ipsum dolor sit amet, 
// 								consectetur adipiscing elit. 
// 								Sed ac urna eget nunc vestibulum
// 							</p>
// 						</div>
// 						<div className="genre">
// 							<span style={{ "--i": 1 }}>Drama</span>
// 							<span style={{ "--i": 2 }}>Action</span>  
// 						</div>
// 					</div>
// 				</SwiperSlide>

// 				<SwiperSlide className="swiper-slide slide-4">
// 					<div className="title">
// 						<h1>Slide 4</h1>
// 					</div>
// 					<div className="content">
// 						<div className="score">4.8</div>
// 						<div className="text">
// 							<h2>Slide 4</h2>
// 							<p>
// 								Lorem ipsum dolor sit amet, 
// 								consectetur adipiscing elit. 
// 								Sed ac urna eget nunc vestibulum
// 							</p>
// 						</div>
// 						<div className="genre">
// 							<span style={{ "--i": 1 }}>Drama</span>
// 							<span style={{ "--i": 2 }}>Action</span>  
// 						</div>
// 					</div>
// 				</SwiperSlide> 

// 				<div className="swiper-pagination"></div>
// 			</Swiper>
// 		</div>
//     </main>
//   );
// }

// export default CardSlider;