import { useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 p-4">
      <div className="bg-gradient-to-br from-gray-300 to-gray-100 text-gray-900 p-8 rounded-[30px] shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-orange-500 text-4xl font-bold">🏡</span>
            <h1 className="text-2xl font-semibold capitalize">
              Sha<span className="text-orange-500">Properties</span>
            </h1>
          </Link>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
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

          {/* Buttons Wrapper */}
          <div className="flex flex-col gap-3 items-center">
            {/* Sign In Button */}
            <button
              disabled={loading}
              className="w-10/12 bg-orange-500 text-white p-3 rounded-[30px] text-center hover:bg-orange-400 transition disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>

            {/* Sign In with Google */}
            <button className="w-10/12 flex justify-center items-center gap-2 bg-orange-500 text-white p-3 rounded-[30px] text-center hover:bg-orange-400 transition">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </div>
        </form>

        {/* No Account? Sign Up */}
        <div className="flex justify-center gap-2 mt-5 text-sm">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
