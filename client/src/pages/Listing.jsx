import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="bg-white">
      {loading && <p className="text-center my-10 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-10 text-2xl text-red-500">
          Something went wrong!
        </p>
      )}

      {listing && !loading && !error && (
        <div>
          {/* Image Swiper */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Icon */}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow cursor-pointer">
            <FaShare
              className="text-orange-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>

          {/* Copied Notification */}
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 bg-gray-100 px-3 py-1 rounded shadow">
              Link copied!
            </p>
          )}

          {/* Details Section */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-[#10161c] mb-2">
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </h1>
            <p className="flex items-center gap-2 text-gray-600 text-sm mb-4">
              <FaMapMarkerAlt className="text-orange-500" /> {listing.address}
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
              {listing.offer && (
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                  Save ${+listing.regularPrice - +listing.discountPrice}
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">
              <span className="font-semibold text-[#10161c]">
                Description:{" "}
              </span>
              {listing.description}
            </p>

            <ul className="flex flex-wrap gap-6 text-sm text-gray-800 font-medium mb-6">
              <li className="flex items-center gap-2">
                <FaBed className="text-orange-500" />
                {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-orange-500" />
                {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
              </li>
              <li className="flex items-center gap-2">
                <FaParking className="text-orange-500" />
                {listing.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-2">
                <FaChair className="text-orange-500" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-[#10161c] text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
