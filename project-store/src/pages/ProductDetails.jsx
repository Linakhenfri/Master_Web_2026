import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://dzshop-backend.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <div className="p-8 text-center text-xl">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 mt-10 rounded-lg shadow-md flex flex-col md:flex-row gap-10">
      
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src={product?.thumbnail} 
          alt={product?.title} 
          className="max-h-96 object-contain" 
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">
          {product?.title || "No title"}
        </h2>

        <p className="mb-2">
          {product?.category || "No category"}
        </p>

        <p className="text-4xl font-bold mb-6">
          ${product?.price || 0}
        </p>

        <p className="mb-8">
          {product?.description || "No description"}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white py-3 px-8 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
