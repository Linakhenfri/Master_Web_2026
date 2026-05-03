import { useState } from "react";

export default function CheckoutForm({ cart, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
  });

  const API_URL = "https://dzshop-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.fullName) return false;
    if (!formData.email) return false;
    if (!formData.address) return false;
    if (!/^\d{16}$/.test(formData.cardNumber)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Please fill all fields correctly");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity || 1,
      price: item.price,
    }));

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Order failed");
        return;
      }

      alert("🎉 Order placed successfully!");
      onSuccess();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <input
        name="cardNumber"
        placeholder="Card Number (16 digits)"
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-primary text-white px-6 py-3 rounded-lg font-bold cursor-pointer hover:opacity-90"
      >
        Confirm Purchase
      </button>
    </form>
  );
}
