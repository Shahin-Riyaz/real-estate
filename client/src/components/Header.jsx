import { useState } from "react";
import { FaBars, FaTimes, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500 font-semibold capitalize"
      : "hover:text-orange-500 transition capitalize";

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        {/* Left Side - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            className="md:hidden text-white text-xl"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-orange-500 text-2xl font-bold">🏡</span>
            <h1 className="text-lg font-semibold capitalize">
              Sha<span className="text-orange-500">Properties</span>
            </h1>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["/", "/about", "/property", "/pages", "/blog", "/contact"].map(
            (path, index) => (
              <Link key={index} to={path} className={isActive(path)}>
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("-", " ")}
              </Link>
            )
          )}
        </nav>

        {/* Right Side - Buttons & Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <FaPhoneAlt className="text-white" />
            <span className="text-sm capitalize">Call Us Now</span>
            <span className="text-sm font-semibold">+025 757 576 560</span>
          </div>

          {/* Buttons Wrapper */}
          <div className="hidden md:flex gap-2">
            <Link
              to="/sign-in"
              className="bg-gray-700 text-white px-4 py-2 rounded-[30px] font-semibold hover:bg-gray-600 transition capitalize"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-blue-500 text-white px-4 py-2 rounded-[30px] font-semibold hover:bg-blue-400 transition capitalize"
            >
              Sign Up
            </Link>
          </div>

          {/* Profile Icon */}
          <Link to="/profile" className="p-2">
            <FaUserCircle className="text-white text-2xl cursor-pointer hover:text-orange-500 transition" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by Default) */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 text-white p-4">
          <ul className="space-y-4 text-center">
            {["/", "/about", "/property", "/pages", "/blog", "/contact"].map(
              (path, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    className={`block ${isActive(path)}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {path === "/"
                      ? "Home"
                      : path.replace("/", "").replace("-", " ")}
                  </Link>
                </li>
              )
            )}
            <li>
              <div className="flex justify-center items-center gap-2 mt-4">
                <FaPhoneAlt />
                <span className="text-sm capitalize">Call Us Now</span>
              </div>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="block bg-gray-700 text-white px-4 py-2 rounded-[30px] font-semibold hover:bg-gray-600 transition mt-4 capitalize"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                className="block bg-blue-500 text-white px-4 py-2 rounded-[30px] font-semibold hover:bg-blue-400 transition mt-4 capitalize"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
