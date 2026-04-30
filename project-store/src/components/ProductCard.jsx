import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);

    // يرجع للوضع الطبيعي بعد 2 ثواني
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-secondary dark:border-gray-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition flex flex-col relative">
      
      {/* ❤️ زر المفضلة */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 text-xl"
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      <Link to={`/product/${product.id}`} className="flex-1">
        <div className="h-48 flex items-center justify-center overflow-hidden mb-4">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-full object-contain" 
          />
        </div>

        <h3 className="text-sm font-semibold truncate text-textDark dark:text-gray-100">
          {product.title}
        </h3>

        <p className="text-xs mt-1 capitalize text-textDark dark:text-gray-300">
          {product.category}
        </p>
      </Link>

      <div className="flex justify-between items-center mt-3">
        <span className="text-primary font-bold">
          ${product.price}
        </span>

        {/* 🛒 زر Add to Cart */}
        <button
          onClick={handleAdd}
          className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200
            ${
              added
                ? "bg-white text-primary border border-primary cursor-default !hover:bg-white !hover:text-primary"
                : "bg-secondary dark:bg-gray-700 text-textDark dark:text-gray-100 hover:bg-primary dark:hover:bg-gray-600 hover:text-white"
            }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

      </div>
    </div>
  );
}