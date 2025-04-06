import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import projectData from "../data/projectGalleryData.json";
import AppointmentForm from "../components/AppointmentForm";

const slides = projectData.map(({ image, title }) => ({ src: image, title }));

export default function ProjectGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="bg-white text-gray-800">
      {/* Page Banner */}
      <section className="bg-[#10161c] text-white h-64 relative overflow-hidden flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl font-bold mb-2">Projects</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <FaChevronRight className="text-xs" />
            <span>Projects</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-no-repeat bg-center opacity-10 pointer-events-none" />
      </section>
      {/* Featured Listings*/}
      <section className="px-4 pt-16 pb-0 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Our Projects
            </h4>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-snug">
              Featured Real Estate Listings
            </h2>
            <div className="w-24 h-1 bg-orange-400 mb-6" />
          </div>
          <p className="text-gray-600">
            Explore our exclusive range of properties for sale and rent,
            including luxury apartments, villas, and commercial spaces in prime
            Dubai locations. Find your perfect space with exceptional features
            and unmatched convenience, tailored to suit your lifestyle.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-4 py-24 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {projectData.map(({ image, title }, idx) => (
            <div
              key={idx}
              className="break-inside-avoid overflow-hidden rounded-lg relative group cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="w-full transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg"
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsOpen(true);
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xl font-semibold">
                {title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={currentIndex}
          slides={slides}
          render={{
            slide: ({ slide }) => (
              <div className="flex flex-col items-center">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="max-h-[80vh] mx-auto rounded-lg"
                />
                <p className="mt-4 text-white font-semibold text-lg text-center">
                  {slide.title}
                </p>
              </div>
            ),
          }}
        />
      )}
    </div>
  );
}
