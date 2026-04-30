import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ProductContext } from "../context/ProductContext";
import { DarkModeContext } from "../context/DarkModeContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { setSearchTerm } = useContext(ProductContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    setInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", true);
    }
    setDarkMode(!darkMode);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-pink-600 dark:text-pink-400">
        Lina's Finds
      </Link>
      

      {/* Icons & Admin */}
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
            {totalItems}
          </span>
        </Link>

        {/* Admin */}
        <Link
          to="/login"
          className="hover:text-primary transition text-textDark dark:text-gray-100"
        >
          Admin
        </Link>

        {/* Dark Mode Toggle */}
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