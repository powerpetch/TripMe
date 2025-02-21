import React from 'react';
import '../../../App.css';
import './about.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="about-padding prelative" data-scroll-index="1" ref={ref}>
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
                  <motion.div
                    className="text-lg flex flex-col items-center icon-box"
                    variants={boxVariants}
                    initial="hidden"
                    animate={controls}
                    custom={0}
                  >
                    <img
                      className="w-16 h-16 mb-4"
                      src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft1-1.webp"
                      alt="Support"
                    />
                    <h5 className="text-lg font-semibold">Plans</h5>
                    <p className="text-gray-500">
                      Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                    </p>
                  </motion.div>
                </div>

                {/* Book */}
                <div className="col-md-4">
                  <motion.div
                    className="text-lg flex flex-col items-center icon-box"
                    variants={boxVariants}
                    initial="hidden"
                    animate={controls}
                    custom={1}
                  >
                    <img
                      className="w-16 h-16 mb-4"
                      src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft2.webp"
                      alt="Cross Platform"
                    />
                    <h5 className="text-lg font-semibold">Book</h5>
                    <p className="text-gray-500">
                      Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                    </p>
                  </motion.div>
                </div>

                {/* Go */}
                <div className="col-md-4">
                  <motion.div
                    className="text-lg flex flex-col items-center icon-box"
                    variants={boxVariants}
                    initial="hidden"
                    animate={controls}
                    custom={2}
                  >
                    <img
                      className="w-16 h-16 mb-4"
                      src="https://themexriver.com/wp/goyto/wp-content/uploads/2024/04/ft3.webp"
                      alt="Fast"
                    />
                    <h5 className="text-lg font-semibold">Go</h5>
                    <p className="text-gray-500">
                      Phasellus lobortis justo a magna facilisis, in commodo tellus rutrum. Sed vitae condimentum nulla.
                    </p>
                  </motion.div>
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
};

export default About;