import { useState } from "react";

export default function CheckoutForm({ cart, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 SAFE API (no env problems in Vercel)
  const API_URL = "https://dzshop-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Invalid card";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity || 1,
      }));

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          userId: 1,
          items,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order successful!");
        onSuccess();
      } else {
        alert(data.error || "Order failed");
      }
    } catch (err) {
      console.log("Checkout error:", err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />
      {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      {errors.address && <p className="text-red-500">{errors.address}</p>}

      <input
        name="cardNumber"
        placeholder="Card Number"
        onChange={handleChange}
        maxLength={16}
      />
      {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}

      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Confirm Purchase
      </button>
    </form>
  );
}
