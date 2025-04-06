import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    let progress = 0;
    const simulateProgress = setInterval(() => {
      progress += 5;
      setFilePerc((prev) => (prev < 90 ? prev + 5 : prev));
      if (progress >= 90) clearInterval(simulateProgress);
    }, 100);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      clearInterval(simulateProgress);

      if (data.success && data.imageUrl) {
        setFormData((prev) => ({ ...prev, avatar: data.imageUrl }));
        setFilePerc(100);
        setFileUploadError(false);
      } else {
        setFileUploadError(true);
      }
    } catch (error) {
      clearInterval(simulateProgress);
      setFileUploadError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-4 pt-20 pb-24 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#10161c]">
        Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 rounded-xl p-6 flex flex-col gap-4"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-4   "
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">
              Error uploading image (max 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image successfully uploaded!</span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg focus:outline-orange-500"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg focus:outline-orange-500"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg focus:outline-orange-500"
        />
        <button
          disabled={loading}
          className="bg-[#10161c] text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-orange-500 text-white p-3 rounded-lg uppercase text-center hover:bg-orange-600 transition"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-6 text-sm">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-600 cursor-pointer">
          Sign out
        </span>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {updateSuccess && (
        <p className="text-green-600 mt-4">User updated successfully!</p>
      )}

      <button
        onClick={handleShowListings}
        className="text-orange-600 w-full mt-6 font-semibold"
      >
        Show Listings
      </button>

      {showListingsError && (
        <p className="text-red-600 mt-2">Error showing listings</p>
      )}

      {userListings.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl text-center font-bold mb-4 text-[#10161c]">
            Your Listings
          </h2>
          <div className="flex flex-col gap-4">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center gap-4 shadow-sm bg-white"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </Link>
                <Link
                  className="text-gray-800 font-medium hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col items-end text-sm">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-600 hover:underline">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
