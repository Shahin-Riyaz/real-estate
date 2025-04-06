import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaArrowRight } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="relative max-w-sm mx-auto">
      <Link to={`/listing/${listing._id}`} className="block group">
        {/* Background Image */}
        <div className="overflow-hidden rounded-t-xl">
          <img
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg"
            }
            alt={listing.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Floating Card Content */}
        <div className="bg-white rounded-xl shadow-md px-6 py-6 space-y-4 mt-[-2.5rem] relative z-10 mx-auto w-[90%]">
          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 leading-snug">
            {listing.name}
          </h3>

          {/* Beds & Baths */}
          <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-1 text-orange-500">
              <FaBed />
              <span className="text-gray-600">
                {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-orange-500">
              <FaBath />
              <span className="text-gray-600">
                {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-gray-800">
            ${listing.offer ? listing.discountPrice : listing.regularPrice}
            <span className="text-sm font-medium text-gray-500 ml-1">
              {listing.type === "rent" && "/per month"}
            </span>
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MdLocationOn className="text-orange-500" />
            <span>{listing.address}</span>
          </div>

          {/* Book Now */}
          <div className="pt-2">
            <span className="text-orange-500 font-semibold text-sm inline-flex items-center gap-1 hover:underline">
              Book Now <FaArrowRight className="text-xs" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
