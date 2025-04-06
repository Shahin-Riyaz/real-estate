import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      if (!data.success) return console.log(data.message);
      setFormData(data);
    };
    fetchListing();
  }, [params.listingId]);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setImageUploadError(false);

    const filesArray = Array.from(files);

    try {
      const urls = await Promise.all(
        filesArray.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (!data.success) throw new Error("Upload failed");
          return data.imageUrl;
        })
      );

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...urls],
      }));
    } catch (error) {
      setImageUploadError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (["sale", "rent"].includes(id)) {
      return setFormData((prev) => ({ ...prev, type: id }));
    }

    if (["parking", "furnished", "offer"].includes(id)) {
      return setFormData((prev) => ({ ...prev, [id]: checked }));
    }

    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.imageUrls.length < 1)
        return setError("Please upload images.");
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount price must be lower than regular price.");
      }

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) return setError(data.message);
      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="bg-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto rounded-xl border border-gray-200 shadow-sm mt-20 mb-24 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#10161c]">
        Update Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          <input
            type="text"
            id="name"
            placeholder="Property Name"
            className="border rounded-lg px-4 py-3"
            minLength="10"
            maxLength="62"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <textarea
            id="description"
            placeholder="Description"
            className="border rounded-lg px-4 py-3"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border rounded-lg px-4 py-3"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <div className="flex flex-wrap gap-6 text-sm">
            {[
              ["sale", "Sell"],
              ["rent", "Rent"],
              ["parking", "Parking"],
              ["furnished", "Furnished"],
              ["offer", "Offer"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={key}
                  checked={formData[key] === true || formData.type === key}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              ["bedrooms", "Beds"],
              ["bathrooms", "Baths"],
              ["regularPrice", "Regular Price"],
              ["discountPrice", "Discounted Price"],
            ]
              .filter(([id]) => id !== "discountPrice" || formData.offer)
              .map(([id, label]) => (
                <div key={id} className="flex flex-col">
                  <input
                    type="number"
                    id={id}
                    required
                    className="border rounded-lg px-4 py-3"
                    min="1"
                    max="10000000"
                    value={formData[id]}
                    onChange={handleChange}
                  />
                  <label className="text-sm text-gray-500 mt-1">
                    {label}
                    {id.includes("Price") && formData.type === "rent" && (
                      <span className="text-xs"> ($ / month)</span>
                    )}
                  </label>
                </div>
              ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6">
          <p className="font-semibold text-[#10161c]">
            Upload Images
            <span className="text-gray-500 text-sm ml-2">
              (first image will be cover, max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="flex-1 p-3 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              disabled={uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-sm text-red-600">{imageUploadError}</p>
          )}

          {formData.imageUrls.map((url, idx) => (
            <div
              key={url}
              className="flex justify-between items-center border rounded-lg px-4 py-2"
            >
              <img
                src={url}
                alt="uploaded"
                className="w-20 h-20 object-cover rounded"
              />
              <button
                onClick={() => handleRemoveImage(idx)}
                className="text-red-600 font-medium text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            disabled={loading || uploading}
            className="bg-[#10161c] text-white py-3 rounded-lg uppercase font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </main>
  );
}
``;
