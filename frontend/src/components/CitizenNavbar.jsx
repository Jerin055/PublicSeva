import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Sun, Moon } from "lucide-react";
import { logout } from "../utils/auth";

export default function CitizenNavbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
      <div className="max-w-8xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* LEFT GROUP: Logo + Nav */}
        <div className="flex items-center gap-10">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 text-2xl font-bold text-green-700 dark:text-green-400 cursor-pointer"
            onClick={() => navigate("/citizen/home")}
          >
            <Leaf className="text-green-600 dark:text-green-400" />
            PublicSeva
          </div>

          {/* Nav Links (LEFT aligned) */}
          <div className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
            <button
              onClick={() => navigate("/citizen/home")}
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/citizen/status")}
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Check Status
            </button>

            <button
              onClick={() => navigate("/citizen/map")}
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Map
            </button>

            <button
              onClick={() => navigate("/citizen/profile")}
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              Profile
            </button>
          </div>
        </div>

        {/* RIGHT GROUP: Dark Mode + Logout */}
        <div className="flex items-center gap-4">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
