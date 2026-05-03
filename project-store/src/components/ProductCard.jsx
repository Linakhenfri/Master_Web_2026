import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const [added, setAdded] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="p-4 border rounded-lg flex flex-col relative">

      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2"
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      <Link to={`/product/${product.id}`} className="flex-1">
        <img 
          src={product?.thumbnail} 
          alt={product?.title} 
        />

        <h3>
          {product?.title || "No title"}
        </h3>

        <p>
          {product?.category || "No category"}
        </p>
      </Link>

      <div className="flex justify-between mt-3">
        <span>
          ${product?.price || 0}
        </span>

        <button onClick={handleAdd}>
          {added ? "Added ✓" : "Add"}
        </button>
      </div>
    </div>
  );
}
