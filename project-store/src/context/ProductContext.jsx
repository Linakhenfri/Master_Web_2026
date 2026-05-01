import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 مصدر واحد فقط: backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔍 search
  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔃 sort
  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;
    if (sortOption === "highToLow") return b.price - a.price;
    if (sortOption === "AtoZ") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <ProductContext.Provider
      value={{
        products: sortedProducts,
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
