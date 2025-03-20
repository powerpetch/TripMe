import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterLinks = [
  {
    title: "About Us",
    link: "/#about",
  },
  {
    title: "Explore Features",
    link: "/#features",
  },
  {
    title: "Our Trips",
    link: "/#works",
  },
];

const HelpLinks = [
  {
    title: "Customer Support",
    link: "/#support",
  },
  {
    title: "Terms & Conditions",
    link: "/#terms",
  },
  {
    title: "Privacy Policy",
    link: "/#policy",
  },
];

const Footer = () => {
  return (
    <div className="bg-dark text-white">
      <section className="container py-10">
        <div className="grid md:grid-cols-5 py-5">
          {/* Company Details - takes 3 columns */}
          <div className="md:col-span-3 py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              Trip-me
            </h1>
            <p className="text-sm max-w-md">
              Your social travel companion. Share adventures, connect with fellow travelers, 
              and discover new destinations. Join our community to make your travel 
              experiences more memorable and inspiring.
            </p>
            <br />
            {/* Social Handle */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:scale-110 transition-transform">
                <FaInstagram className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <FaFacebook className="text-2xl hover:text-primary duration-300" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <FaLinkedin className="text-2xl hover:text-primary duration-300" />
              </a>
            </div>
          </div>

          {/* Links - each takes 1 column */}
          <div className="py-8 px-4">
            <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
              Company
            </h1>
            <ul className="flex flex-col gap-3">
              {FooterLinks.map((link) => (
                <li
                  key={link.title}
                  className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400"
                >
                  <a href={link.link}>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-8 px-4">
            <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
              Help
            </h1>
            <ul className="flex flex-col gap-3">
              {HelpLinks.map((link) => (
                <li
                  key={link.title}
                  className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-400"
                >
                  <a href={link.link}>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center pt-8 mt-2 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Trip-me. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Footer;