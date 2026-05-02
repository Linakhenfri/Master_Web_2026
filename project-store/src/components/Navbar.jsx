import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { setSearchTerm } = useContext(ProductContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // 🔍 search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setInput(value);
    setSearchTerm(value);
  };

  // 🌙 dark mode toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
    setDarkMode(!darkMode);
  };

  // 🔐 check login
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      user = null;
    }
  }

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">

      {/* 🔵 Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-pink-600 dark:text-pink-400"
      >
        Lina's Finds
      </Link>

      {/* 🔍 Search Bar */}
      <div className="w-full md:w-1/3">
        <input
          type="text"
          value={input}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-textDark dark:text-gray-100 focus:outline-none"
        />
      </div>

      {/* 🛒 Icons */}
      <div className="flex gap-5 items-center">

        {/* Wishlist */}
        <Link to="/wishlist" className="relative text-textDark dark:text-gray-100">
          ❤️
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-2 py-0.5">
            {wishlist.length}
          </span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="relative text-textDark dark:text-gray-100">
          🛒
          <span className="absolute -top-2 -right-3 bg-primary text-white text-xs rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        </Link>

        {/* 👑 Admin link (only if admin) */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-primary transition text-textDark dark:text-gray-100"
          >
            Admin
          </Link>
        )}

        {/* 🔐 Login / Logout */}
        {!token ? (
          <Link
            to="/login"
            className="hover:text-primary transition text-textDark dark:text-gray-100"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition text-textDark dark:text-gray-100"
          >
            Logout
          </button>
        )}

        {/* 🌙 Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-textDark dark:text-gray-100 hover:bg-primary dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

      </div>
    </nav>
  );
}
