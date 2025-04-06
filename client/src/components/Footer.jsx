import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaHome,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500 text-2xl">🏡</span>
            <h1 className="text-xl font-semibold">
              Sha<span className="text-orange-500">Properties</span>
            </h1>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            "Discover Dubai’s finest homes and investment properties with Sha
            Properties — where expertise meets elegance in every transaction."{" "}
          </p>
          <div className="flex gap-3">
            <FaFacebookF className="text-white hover:text-orange-500 cursor-pointer" />
            <FaTwitter className="text-white hover:text-orange-500 cursor-pointer" />
            <FaYoutube className="text-white hover:text-orange-500 cursor-pointer" />
            <FaInstagram className="text-white hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaHome className="text-orange-500 text-xs" />
              <Link to="/listing" className="hover:text-orange-500">
                Listing
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaHome className="text-orange-500 text-xs" />
              <Link to="/about" className="hover:text-orange-500">
                About Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaHome className="text-orange-500 text-xs" />
              <Link to="/contact" className="hover:text-orange-500">
                Contact Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaHome className="text-orange-500 text-xs" />
              <Link to="/projects" className="hover:text-orange-500">
                Project
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2 hover:text-orange-500">
              <FaHome className="text-orange-500 text-xs" /> Prestige Management
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500">
              <FaHome className="text-orange-500 text-xs" /> Prime Investments
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500">
              <FaHome className="text-orange-500 text-xs" /> Elite Realty
              Services
            </li>
            <li className="flex items-center gap-2 hover:text-orange-500">
              <FaHome className="text-orange-500 text-xs" /> Dream Property
              Solutions
            </li>
          </ul>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-lg font-bold mb-4">Our Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              "https://img.freepik.com/free-photo/dubai-skyline-downtown-skyscrapers-sunset-modern-architecture-concept-with-highrise-buildings-world-famous-metropolis-united-arab-emirates_231208-7630.jpg?w=740",
              "https://img.freepik.com/free-photo/futuristic-landscape-dubai_23-2151339806.jpg?w=1380",
              "https://img.freepik.com/free-photo/night-view-skyscraper-port-olimpic_1398-428.jpg?w=740",
              "https://img.freepik.com/free-photo/shanghai-aerial-sunset_649448-3733.jpg?w=1380",
              "https://img.freepik.com/free-photo/dubai-marina_158595-1999.jpg?w=1380",
              "https://img.freepik.com/free-photo/dubai-united-arab-emirates-november-11-view-dubai-marina-towers-dubai-united-arab-emirates-november-11-2014-dubai-marina-is-district-dubai-artificial-canal-city_268835-1057.jpg?w=740",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`gallery-${i + 1}`}
                className="w-20 h-20 object-cover rounded-md hover:opacity-80"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 px-4 max-w-7xl mx-auto">
        <p>© Sha Properties {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="/about" className="hover:text-white">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
