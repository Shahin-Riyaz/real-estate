import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch("https://formspree.io/f/xzzejrnw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left - Text + Form */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe To Our <span className="text-orange-500">Newsletter</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest Dubai real estate insights, listings, and offers
            directly in your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="relative w-full sm:w-96">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
            >
              SUBSCRIBE NOW
            </button>
          </form>

          {success && (
            <p className="text-green-600 mt-4 font-medium">
              Thanks for subscribing!
            </p>
          )}
          {error && (
            <p className="text-red-600 mt-4 font-medium">
              Something went wrong. Try again.
            </p>
          )}
        </div>

        {/* Right - Image */}
        <div className="flex-1">
          <img
            src="https://img.freepik.com/free-vector/shiny-exterior-modern-skyline-building-background-with-reflection-effect_1017-44214.jpg?t=st=1743656338~exp=1743659938~hmac=a489df34b2be0559eb52fe655023d5b3b9f0ee255d33058b4731f0bf9988de19&w=996"
            alt="Newsletter"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
