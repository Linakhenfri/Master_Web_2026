import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // استرجاع من LocalStorage عند البداية
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  // حفظ Wishlist تلقائياً
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // دالة لإضافة أو إزالة منتج من المفضلة
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  // دالة للتحقق إذا المنتج موجود في المفضلة
  const isInWishlist = (id) => {
    return wishlist.some(p => p.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};