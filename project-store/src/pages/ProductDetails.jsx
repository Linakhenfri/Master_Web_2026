import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product)
    return (
      <div className="p-8 text-center text-xl text-textDark bg-background">
        Loading product...
      </div>
    );

  return (
   <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 mt-10 rounded-lg shadow-md flex flex-col md:flex-row gap-10">
  
  {/* صورة المنتج */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img src={product.thumbnail} alt={product.title} className="max-h-96 object-contain" />
  </div>

  {/* تفاصيل المنتج */}
  <div className="w-full md:w-1/2 flex flex-col justify-center">
    <h2 className="text-3xl font-bold mb-4 text-textDark dark:text-white">{product.title}</h2>
    <p className="text-textDark dark:text-gray-300 capitalize mb-2">{product.category}</p>
    <p className="text-primary dark:text-yellow-400 text-4xl font-bold mb-6">${product.price}</p>
    <p className="text-textDark dark:text-gray-300 leading-relaxed mb-8">{product.description}</p>

    <button
      onClick={() => addToCart(product)}
      className="bg-primary dark:bg-yellow-500 text-white dark:text-textDark py-3 px-8 rounded-lg font-bold text-lg w-full md:w-auto"
    >
      Add to Cart
    </button>
  </div>
</div>
  );
}