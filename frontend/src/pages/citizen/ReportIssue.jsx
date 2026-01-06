import { useState, useEffect, useRef } from "react";
import CitizenNavbar from "../../components/CitizenNavbar";
import Footer from "../../components/Footer";
import { Upload, MapPin } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function ReportIssue() {
  // ---------------- IMAGE STATE ----------------
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ---------------- MAP STATE ----------------
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coords, setCoords] = useState(null);

  // ---------------- IMAGE HANDLER ----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file); // later send to backend
    setPreview(URL.createObjectURL(file)); // preview
  };

  // ---------------- MAP INITIALIZATION ----------------
  useEffect(() => {
    if (!mapContainerRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setCoords({ lng, lat });

        mapRef.current = new maplibregl.Map({
          container: mapContainerRef.current,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`,
          center: [lng, lat],
          zoom: 15
        });

        markerRef.current = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);

        markerRef.current.on("dragend", () => {
          const { lng, lat } = markerRef.current.getLngLat();
          setCoords({ lng, lat });
        });
      },
      () => {
        alert("Please allow location access to report an issue.");
      }
    );

    return () => {
      mapRef.current && mapRef.current.remove();
    };
  }, []);

  // ---------------- UI ----------------
  return (
    <>
      <CitizenNavbar />

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Report an Issue
          </h1>
          <p className="text-gray-600 mt-2">
            Report waste or cleanliness issues to help improve your community.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-8 space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />

            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-45 cursor-pointer hover:border-green-500 transition overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain bg-gray-100"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="mx-auto mb-2" />
                  <p className="text-sm">Click to upload or drag & drop</p>
                  <p className="text-xs mt-1">JPG / PNG · Clear photo preferred</p>
                </div>
              )}
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              placeholder="e.g. Garbage piling near bus stop"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Location
            </label>

            <div
              ref={mapContainerRef}
              className="border rounded-lg h-64 overflow-hidden"
            />

            {coords && (
              <p className="text-xs text-gray-500 mt-2">
                Selected location: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address (optional)
            </label>
            <input
              type="text"
              placeholder="Area, road, landmark"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              disabled
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold opacity-70 cursor-not-allowed"
            >
              Submit Issue
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Submission will be enabled after backend integration
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
