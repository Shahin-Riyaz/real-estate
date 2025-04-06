import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdHomeWork } from "react-icons/md";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

import ListingItem from "../components/ListingItem";
import StatsSection from "../components/StatsSection";
import AppointmentForm from "../components/AppointmentForm";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // 👈 Required for animations to work after refresh

    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=3");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#fffaf5] via-white to-[#fefefe] py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6" data-aos="fade-right">
            <h1 className="text-5xl md:text-6xl font-bold text-[#10161c] leading-tight">
              Beyond Walls We <br />
              <span className="text-orange-500">Build Dreams</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-md">
              Unlock the Power of Real Estate. Making Your Real Estate Dreams a
              Reality with <span className="font-semibold">Sha Properties</span>
              .
            </p>
            <Link
              to="/about"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold shadow transition"
            >
              About Us
            </Link>
          </div>

          {/* Right Image */}
          <img
            src="https://res.cloudinary.com/dyqmml8de/image/upload/v1743875807/mern-uploads/ycdfuceyqbogvi2vlcsp.jpg"
            alt="Hero"
            data-aos="fade-left"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Single Pre-designed Gallery Image */}
        <div data-aos="fade-right">
          <img
            src="https://res.cloudinary.com/dyqmml8de/image/upload/v1743876063/mern-uploads/b2z74heqylnk0ooyuqgb.jpg"
            alt="City Gallery"
          />
        </div>

        {/* About Content */}
        <div data-aos="fade-left">
          <h2 className="text-4xl font-bold text-[#10161c] mb-4 leading-snug">
            Discover a Lifestyle <br /> Beyond Bricks & Mortar
          </h2>
          <p className="text-gray-600 text-base mb-4">
            <span className="font-semibold text-orange-500">
              Sha Properties
            </span>{" "}
            is more than a real estate agency — we are curators of lifestyle and
            luxury. With a legacy of excellence and a vision rooted in
            innovation, we bring you properties that match not just your budget,
            but your dreams.
          </p>

          <ul className="space-y-3">
            {[
              "Exclusive listings in Dubai’s most elite neighborhoods",
              "Dedicated advisors providing end-to-end property solutions",
              "Seamless process from property discovery to final possession",
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-base"
              >
                <MdHomeWork className="text-orange-500 mt-1" size={20} />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="inline-block mt-6 text-orange-500 font-semibold hover:underline"
          >
            Explore Our Story →
          </Link>
        </div>
      </section>

      {/* Latest Offers */}
      <section className="bg-[#f9f9f9] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="uppercase text-sm font-semibold text-orange-500 mb-2 border-l-4 border-orange-500 pl-2">
                Latest Offers
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Live Your Best Life in a New life Home
              </h2>
            </div>
            <Link
              to="/property"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium"
            >
              View More
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <AppointmentForm />

      {/* Stats Section */}
      <StatsSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
