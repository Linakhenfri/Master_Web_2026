import { createContext, useState, useEffect } from "react";

// إنشاء Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // استرجاع Cart من LocalStorage عند البداية أو إنشاء فارغ
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // استرجاع Wishlist من LocalStorage عند البداية أو إنشاء فارغ
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // حفظ Cart تلقائيًا عند التغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // حفظ Wishlist تلقائيًا عند التغيير
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // إضافة منتج إلى Cart
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  // إزالة منتج من Cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // إضافة منتج إلى Wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  // إزالة منتج من Wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};