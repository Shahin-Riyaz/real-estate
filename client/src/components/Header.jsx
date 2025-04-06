import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/property?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-[#18242d] text-white shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        {/* Left - Logo & Menu */}
        <div className="flex items-center gap-4">
          <button className="md:hidden text-white text-xl flex items-center gap-1">
            <span className="text-2xl">☰</span>
            <span className="text-sm font-semibold">Menu</span>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl font-bold">🏡</span>
            <h1 className="text-xl font-semibold">
              Sha<span className="text-orange-500">Properties</span>
            </h1>
          </Link>
        </div>

        {/* Center - Nav + Search */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
            <Link to="/property" className="hover:text-orange-500 transition">
              Propertry
            </Link>
            <Link to="/projects" className="hover:text-orange-500 transition">
              Projects
            </Link>
            <Link to="/about" className="hover:text-orange-500 transition">
              About Us
            </Link>

            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact Us
            </Link>
          </nav>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="ml-6 flex items-center bg-[#1f2e3b] border border-[#2b3a49] rounded-full px-4 py-1"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-32 md:w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-orange-500 ml-2" />
            </button>
          </form>
        </div>

        {/* Right - Call & Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* Auth Section */}
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.avatar}
                alt="profile"
                className="h-9 w-9 rounded-full border-2 border-orange-500 object-cover"
              />
            </Link>
          ) : (
            <div className="flex gap-3 ml-4">
              <Link
                to="/sign-in"
                className="bg-transparent border border-orange-500 text-orange-500 px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="bg-orange-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
