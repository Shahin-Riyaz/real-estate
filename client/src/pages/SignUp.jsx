import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 p-4">
      {/* Sign-Up Form */}
      <div className="relative bg-gradient-to-br from-gray-300 to-gray-100 text-gray-900 p-8 rounded-[30px] shadow-lg w-full max-w-md z-10">
        {/* Logo (Increased Size) */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-orange-500 text-4xl font-bold">🏡</span>
            <h1 className="text-2xl font-semibold capitalize">
              Sha<span className="text-orange-500">Properties</span>
            </h1>
          </Link>
        </div>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-200 p-3 rounded-[30px] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-200 p-3 rounded-[30px] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 p-3 rounded-[30px] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="password"
            onChange={handleChange}
            required
          />

          {/* Stay Signed In (Centered) */}
          <div className="flex justify-center items-center gap-2 text-sm">
            <input type="checkbox" id="staySignedIn" className="w-4 h-4" />
            <label htmlFor="staySignedIn">Stay signed in</label>
          </div>

          {/* Buttons Wrapper - Wider Buttons & Increased Border Radius */}
          <div className="flex flex-col gap-3 items-center">
            {/* Sign Up Button */}
            <button
              disabled={loading}
              className="w-10/12 bg-orange-500 text-white p-3 rounded-[30px] text-center hover:bg-orange-400 transition disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign up"}
            </button>

            {/* Sign Up with Google Button (Same Size & Style) */}
            <button className="w-10/12 flex justify-center items-center gap-2 bg-orange-500 text-white p-3 rounded-[30px] text-center hover:bg-orange-400 transition">
              <FcGoogle className="text-xl" />
              Sign up with Google
            </button>
          </div>
          <OAuth />
        </form>

        {/* Already have an account */}
        <div className="flex justify-center gap-2 mt-5 text-sm">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-orange-500 hover:underline">
            Sign in
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
