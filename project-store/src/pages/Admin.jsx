import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(atob(token.split(".")[1]));

      // 🔐 check admin role
      if (user.role !== "admin") {
        navigate("/");
        return;
      }

      // 📦 load products
      const loadProducts = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await res.json();
        setProducts(data);
      };

      loadProducts();
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  // 🗑 delete (frontend only حاليا)
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    alert(`Product ${id} deleted locally!`);
  };

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-textDark">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-primary text-background px-4 py-2 rounded font-bold transition hover:bg-[#a03366]"
        >
          Logout
        </button>
      </div>

      <div className="bg-background shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-primary text-background">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-secondary">
                <td className="p-4">{p.id}</td>

                <td className="p-4">
                  <img
                    src={p.image}
                    className="h-10 w-10 object-contain"
                    alt=""
                  />
                </td>

                <td className="p-4 text-sm truncate max-w-xs">
                  {p.title}
                </td>

                <td className="p-4 font-bold text-primary">
                  ${p.price}
                </td>

                <td className="p-4 text-center flex gap-2 justify-center">
                  <button className="bg-primary text-background px-3 py-1 rounded text-xs hover:bg-[#a03366] transition">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-500 text-background px-3 py-1 rounded text-xs hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
