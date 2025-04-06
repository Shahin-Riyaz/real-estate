import React, { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaCalendarAlt,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";

export default function AppointmentForm() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/myzenbqy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setFormStatus("Thank you! Your appointment has been booked.");
        e.target.reset();
      } else {
        setFormStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormStatus("Network error. Please try again later.");
    }
  };

  return (
    <section className="px-4 pt-20 pb-20 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Block */}
        <div className="bg-[#10161c] text-white p-10">
          <span className="text-sm font-bold uppercase text-orange-500 bg-gray-900 px-3 py-1 inline-block rounded mb-4">
            Book Appointment
          </span>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Schedule Your <br /> Property Visit
          </h2>
          <p className="text-gray-400 mb-6">
            Ready to see your future home or investment opportunity? Schedule a
            viewing with our real estate experts today and take the next step
            toward your dream property.
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

        {/* Right Form */}
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
              required
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
          <div className="relative md:col-span-2">
            <input
              type="date"
              name="date"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <FaCalendarAlt className="absolute top-3.5 left-3 text-orange-500" />
          </div>
          <div className="relative md:col-span-2">
            <input
              type="time"
              name="time"
              required
              className="w-full border border-gray-300 rounded px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <FaClock className="absolute top-3.5 left-3 text-orange-500" />
          </div>
          <textarea
            name="message"
            rows="4"
            placeholder="Purpose"
            className="md:col-span-2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded hover:opacity-90"
          >
            Book Appointment
          </button>
          {formStatus && (
            <p className="md:col-span-2 text-center text-green-600 font-semibold mt-2">
              {formStatus}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
