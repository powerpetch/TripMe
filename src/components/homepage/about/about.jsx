import React from 'react';
import '../../../App.css';
import './about.css';

const About = () => (
  <section className="about-padding prelative" data-scroll-index="1">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="text-4xl sectioner-header text-center">
            <h3>Just 3 Step</h3>
            <span className="line"></span>
            <p>
              Sed quis nisi nisi. Proin consectetur porttitor dui sit amet
              viverra. Fusce sit amet lorem faucibus, vestibulum ante in,
              pharetra ante.
            </p>
          </div>
          <div className="section-content text-center">
            <div className="row">
              {/* Plans */}
              <div className="col-md-4">
                <div className="text-lg flex flex-col items-center icon-box wow fadeInUp" data-wow-delay="0.2s">
                  <img
                    className="w-16 h-16 mb-4"
                    src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft1-1.webp"
                    alt="Support"
                  />
                  <h5 className="text-lg font-semibold">Plans</h5>
                  <p className="text-gray-500">
                    Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                  </p>
                </div>
              </div>

              {/* Book */}
              <div className="col-md-4">
                <div className="text-lg flex flex-col items-center icon-box wow fadeInUp" data-wow-delay="0.4s">
                  <img
                    className="w-16 h-16 mb-4"
                    src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft2.webp"
                    alt="Cross Platform"
                  />
                  <h5 className="text-lg font-semibold">Book</h5>
                  <p className="text-gray-500">
                    Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                  </p>
                </div>
              </div>

              {/* Go */}
              <div className="col-md-4">
                <div className="text-lg flex flex-col items-center icon-box wow fadeInUp" data-wow-delay="0.6s">
                  <img
                    className="w-16 h-16 mb-4"
                    src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft3.webp"
                    alt="Fast"
                  />
                  <h5 className="text-lg font-semibold">Go</h5>
                  <p className="text-gray-500">
                    Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                  </p>
                </div>
              </div>
            </div>
            <a href="#" className="about-btn">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
