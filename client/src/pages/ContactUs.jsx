import React, { useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaChevronRight,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xblgzydd", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setFormStatus("Thank you! Your message has been sent.");
        e.target.reset();
      } else {
        setFormStatus("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormStatus("Network error. Please try again later.");
    }
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Page Banner */}
      <section className="bg-[#10161c] text-white h-64 flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl font-bold mb-2">Contact Us</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <FaChevronRight className="text-xs" />
            <span>Contact</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-no-repeat bg-center opacity-10 pointer-events-none" />
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <FaPaperPlane />,
            title: "Email",
            lines: ["info@shaproperties.com", "support@shaproperties.com"],
          },
          {
            icon: <FaMapMarkerAlt />,
            title: "Location",
            lines: ["Business Bay, Dubai, UAE"],
          },
          {
            icon: <FaPhoneAlt />,
            title: "Contacts",
            lines: ["+971 50 123 4567", "+971 55 765 4321"],
          },
        ].map((card, index) => (
          <div
            key={index}
            className="text-center border rounded-lg shadow-sm p-6"
          >
            <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 text-white text-2xl rounded-md">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            {card.lines.map((line, i) => (
              <p key={i} className="text-gray-600">
                {line}
              </p>
            ))}
          </div>
        ))}
      </section>

      {/* Contact Form */}

      <section className="px-4 pt-0 pb-2 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#10161c] text-white p-10">
            <span className="text-sm font-bold uppercase text-orange-500 bg-gray-900 px-3 py-1 inline-block rounded mb-4">
              Let's Connect
            </span>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              They Chose Perfect <br /> The Property
            </h2>
            <p className="text-gray-400 mb-6">
              Real estate is a lucrative industry that involves the selling and
              renting of properties. It encompasses residential investments
              across Dubai.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-orange-600 rounded-full">
                <FaPhoneAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Need help?</p>
                <p className="text-lg font-semibold text-white">
                  +971 50 123 4567
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FaUser className="absolute top-3.5 left-3 text-orange-500" />
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="w-full border border-gray-300 rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FaPhoneAlt className="absolute top-3.5 left-3 text-orange-500" />
            </div>
            <div className="relative md:col-span-2">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FaPaperPlane className="absolute top-3.5 left-3 text-orange-500" />
            </div>
            <textarea
              name="message"
              rows="5"
              placeholder="Write Message.."
              className="md:col-span-2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded hover:opacity-90"
            >
              Send Message
            </button>
            {formStatus && (
              <p className="md:col-span-2 text-center text-green-600 font-semibold mt-2">
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>
      {/* Google Map */}
      <section className="px-0 pt-24 pb-0">
        <iframe
          title="Sha Properties Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3718991349995!2d55.27437667534773!3d25.197201977720007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d7e80a3f147%3A0x92d7d99eb1a2bb!2sBusiness%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1713659000000"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          className="w-full h-[400px] border-0"
        ></iframe>
      </section>
      <NewsletterSection />
    </div>
  );
}
