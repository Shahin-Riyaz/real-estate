import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import {
  LuGlobe,
  LuHome,
  LuBanknote,
  LuUsers,
  LuBuilding,
  LuMapPin,
} from "react-icons/lu";
import StatsSection from "../components/StatsSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const propertyData = [
    { icon: <LuGlobe className="text-3xl" />, title: "Luxury Villas" },
    { icon: <LuHome className="text-3xl" />, title: "Modern Apartments" },
    { icon: <LuBanknote className="text-3xl" />, title: "Investment Deals" },
    { icon: <LuUsers className="text-3xl" />, title: "Family Communities" },
    { icon: <LuBuilding className="text-3xl" />, title: "Business Towers" },
    { icon: <LuMapPin className="text-3xl" />, title: "Prime Locations" },
  ];

  return (
    <div>
      {/* Top Banner */}
      <section className="bg-[#10161c] text-white h-64 relative overflow-hidden flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl font-bold mb-2">About Us</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <FaChevronRight className="text-xs" />
            <span>About</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-no-repeat bg-center opacity-10 pointer-events-none" />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative" data-aos="fade-right">
            <img
              src="https://img.freepik.com/premium-photo/reflection-buildings-water_1048944-1742326.jpg?w=740"
              alt="Dubai Real Estate"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <h3 className="text-sm text-orange-500 font-semibold uppercase mb-3 tracking-wide">
              Welcome to Sha Properties
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Dubai's Gateway to Premium Real Estate
            </h2>

            {/* Home Icon Bullets */}
            <ul className="mb-6 space-y-4 text-gray-700">
              {[
                "Tailored solutions for investors & families",
                "Extensive listings in prime Dubai locations",
                "Dedicated local expertise and concierge support",
                "Trusted by 10,000+ satisfied clients worldwide",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <MdHomeWork className="text-orange-500 mt-1" size={20} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-base leading-relaxed">
              Sha Properties offers a curated portfolio of high-end residential
              and commercial properties throughout Dubai. From waterfront villas
              to modern business hubs, we’re here to help you navigate every
              opportunity and unlock your ideal investment.
            </p>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-left" data-aos="fade-up">
            <p className="uppercase text-sm font-semibold text-orange-500 mb-2 border-l-4 border-orange-500 pl-2">
              Property Categories
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-snug">
              Explore Dubai's Most In-Demand Properties
            </h2>
          </div>

          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            data-aos="fade-up"
          >
            {propertyData.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 p-6 rounded-md shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="mb-4 text-orange-500">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Discover exceptional {item.title.toLowerCase()} curated by our
                  Dubai specialists — tailored for lifestyle, luxury, and return
                  on investment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <StatsSection />
      <NewsletterSection />
    </div>
  );
}
