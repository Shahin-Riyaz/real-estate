import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Property() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setShowMore(data.length > 8);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (["all", "rent", "sale"].includes(id)) {
      setSidebardata({ ...sidebardata, type: id });
    } else if (id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (["parking", "furnished", "offer"].includes(id)) {
      setSidebardata({ ...sidebardata, [id]: checked });
    } else if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    navigate(`/property?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    setListings([...listings, ...data]);
    if (data.length < 9) setShowMore(false);
  };

  return (
    <>
      {/* Page Banner */}
      <section className="bg-[#10161c] text-white h-64 relative overflow-hidden flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <h2 className="text-5xl font-bold mb-2">Property</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="hover:text-orange-500 cursor-pointer">Home</span>
            <span className="text-xs">›</span>
            <span>Property</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filter */}
        <div className="p-6 sm:p-10 md:w-80 border-b-2 md:border-r-2 md:min-h-screen bg-white">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Type:
              </label>
              <div className="flex flex-wrap gap-4">
                {["all", "rent", "sale"].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      id={type}
                      className="w-4 h-4 accent-orange-500"
                      onChange={handleChange}
                      checked={sidebardata.type === type}
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="offer"
                    className="w-4 h-4 accent-orange-500"
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  Offer
                </label>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">
                Amenities:
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-4 h-4 accent-orange-500"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  Parking
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-4 h-4 accent-orange-500"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  Furnished
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-1">
                Sort by:
              </label>
              <select
                onChange={handleChange}
                defaultValue="created_at_desc"
                id="sort_order"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>

        {/* Listing Results */}
        <div className="flex-1 bg-white p-2 sm:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700 col-span-full">
                No listing found!
              </p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 col-span-full text-center">
                Loading...
              </p>
            )}
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>

          {showMore && (
            <div className="flex justify-center mb-10">
              <button
                onClick={onShowMoreClick}
                className="text-orange-600 font-medium hover:underline"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
