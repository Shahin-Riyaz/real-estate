import { useState, useMemo } from "react";
import { FaBars, FaTimes, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = useMemo(
    () => (path) =>
      location.pathname === path
        ? "text-orange-500 font-semibold"
        : "hover:text-orange-500 transition",
    [location.pathname]
  );

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
            <h1 className="text-lg font-semibold">
              City<span className="text-orange-500">Scape</span>
            </h1>
          </Link>
        </div>

        {/* Center - Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["/", "/Property", "/Project", "/About", "/Contact"].map(
            (path, index) => (
              <Link key={index} to={path} className={isActive(path)}>
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("-", " ")}
              </Link>
            )
          )}
        </nav>

        {/* Right Side - Buttons & Profile (Profile stays in header for both desktop & mobile) */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <FaPhoneAlt className="text-white" />
            <span className="text-sm">Call Us Now</span>
            <span className="text-sm font-semibold">+025 757 576 560</span>
          </div>

          {/* Buttons Wrapper */}
          <div className="hidden md:flex gap-2">
            <Link
              to="/sign-in"
              className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition"
            >
              Sign In
            </Link>
            <Link
              to="/add-listing"
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              ADD LISTING →
            </Link>
          </div>

          {/* Profile Icon (Visible in header for both mobile & desktop) */}
          <Link to="/profile">
            <FaUserCircle className="text-white text-2xl cursor-pointer hover:text-orange-500 transition" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation (Hidden by Default) */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 text-white p-4">
          <ul className="space-y-4 text-center">
            {["/", "/Property", "/Project", "/About", "/Contact"].map(
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
                <span className="text-sm">+025 757 576 560</span>
              </div>
            </li>
            <li>
              <Link
                to="/sign-in"
                className="block bg-gray-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/add-listing"
                className="block bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition mt-4"
                onClick={() => setMenuOpen(false)}
              >
                ADD LISTING →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
