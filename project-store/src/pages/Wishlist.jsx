import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="p-20 text-center bg-background dark:bg-gray-900 min-h-screen">
        <h2 className="text-3xl font-bold text-textDark dark:text-white mb-4">
          Your Wishlist is Empty
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-background dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-textDark dark:text-white">
        Your Wishlist ❤️
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}