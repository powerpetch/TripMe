import React from 'react';
import '../App.css';
import './about.css';

const About = () => (
  <section className="about-padding prelative" data-scroll-index='1'>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="sectioner-header text-center">
            <h3>Just 3 step</h3>
            <span className="line"></span>
            <p>Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra. Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.</p>
          </div>
          <div className="section-content text-center">
            <div className="row">
              <div className="col-md-4">
                <div className="icon-box wow fadeInUp" data-wow-delay="0.2s">
                  <img src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft1-1.webp" alt="Support" />
                  <h5>Plans</h5>
                  <p>Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box wow fadeInUp" data-wow-delay="0.4s">
                  <img src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft2.webp" alt="Cross Platform" />
                  <h5>Book</h5>
                  <p>Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="icon-box wow fadeInUp" data-wow-delay="0.6s">
                  <img src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft3.webp" alt="Fast" />
                  <h5>Go</h5>
                  <p>Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.</p>
                </div>
              </div>
            </div>
            <a href="#" className="about-btn">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
