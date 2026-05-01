import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  // جلب المنتجات من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
        const data = await res.json();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // فلترة وترتيب المنتجات عند تغير البحث أو الترتيب
  useEffect(() => {
    let tempProducts = [...products];

    // البحث
    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // الترتيب
    if (sortOption === "lowToHigh") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "aToZ") {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, sortOption, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-textDark bg-background">
        No products found.
      </div>
    );
  }

  return (
   <div className="p-8 bg-background dark:bg-gray-900 min-h-screen">
  
  {/* شريط البحث + Dropdown الترتيب */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full sm:w-1/2 bg-white dark:bg-gray-800 text-textDark dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
    />

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full sm:w-1/4 bg-white dark:bg-gray-800 text-textDark dark:text-gray-100"
    >
      <option value="">Sort By</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
      <option value="aToZ">Alphabetical (A-Z)</option>
    </select>
  </div>

  {/* شبكة المنتجات */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {filteredProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>
  );
}
