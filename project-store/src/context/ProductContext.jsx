import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  // 🔥 Fetch products (pagination + filter)
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?page=${page}&limit=10&category=${category}`
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

  useEffect(() => {
    fetchProducts();
  }, [page, category]);

  // 🔍 search (frontend)
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
        page,
        setPage,
        category,
        setCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
