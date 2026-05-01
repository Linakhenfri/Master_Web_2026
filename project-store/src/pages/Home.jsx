import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}
