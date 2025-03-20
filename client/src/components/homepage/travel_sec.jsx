import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";


// Import images
import icon1 from "../../assets/icon1.webp";
import icon2 from "../../assets/icon2.webp";
import cairo from "../../assets/cairo.jpg";
import venice from "../../assets/venice.jpeg";
import rio from "../../assets/rio-de-janeiro.jpeg";
import phuket from "../../assets/phuket.jpg";

const TravelSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: "0px",
  });
  
  const controls = useAnimation();
  const titleControls = useAnimation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
      titleControls.start("visible");
    } else {
      controls.start("hidden");
      titleControls.start("hidden");
    }
  }, [inView, controls, titleControls]);

  const bubbleVariants = {
    hidden: { y: -50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-green-700 font-bold text-lg">Get To Know Us</h3>
          <motion.h1
            initial="hidden"
            animate={titleControls}
            variants={{
              hidden: { x: 100, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="text-4xl font-extrabold text-gray-800"
          >
            Get the Best Travel Experience
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full">
              <img
                src={icon1}
                alt="Share Travel Stories"
                className="w-6 h-6"
                onError={(e) => {
                  console.error('Failed to load icon1');
                  e.target.src = 'https://via.placeholder.com/24';
                }}
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">Share your moment</h3>
              <p className="text-gray-600">
                Create and share your travel experiences, photos, and stories. 
                Inspire others with your unique adventures and travel tips.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full">
              <img
                src={icon2}
                alt="Connect Travelers"
                className="w-6 h-6"
                onError={(e) => {
                  console.error('Failed to load icon2');
                  e.target.src = 'https://via.placeholder.com/24';
                }}
              />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">Find new friends</h3>
              <p className="text-gray-600">
                Join a vibrant community of travelers. Like, comment, and interact 
                with fellow adventurers from around the world.
              </p>
            </div>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          {[
            { name: "America", image: cairo },
            { name: "Africa", image: venice },
            { name: "Asia", image: rio },
            { name: "Europe", image: phuket },
          ].map((region, index) => (
            <motion.div
              key={index}
              className="relative rounded-full overflow-hidden shadow-lg"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { scale: 0.8, y: -100 + index * 20, opacity: 0 },
                visible: {
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <img
                src={region.image}
                alt={region.name}
                className="w-full h-48 object-cover opacity-100"
                onError={(e) => {
                  console.error(`Failed to load image: ${region.name}`);
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center">
                <span className="text-white text-xl font-bold drop-shadow">
                  {region.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/trip-tgt')}
            className="bg-green-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-900 transition"
          >
            Find Out More
          </button>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;