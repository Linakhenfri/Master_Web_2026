import { useState } from "react";

export default function CheckoutForm({ cart, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});
  const API_URL = "https://dzshop-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.email) newErrors.email = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!/^\d{16}$/.test(formData.cardNumber))
      newErrors.cardNumber = "Invalid card";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // 🔍 debug مهم

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

      console.log("ORDER RESPONSE:", data); // 🔍 مهم

      if (!res.ok) {
        alert(data.error || data.message || "Order failed");
        return;
      }

      alert("Order successful!");
      onSuccess();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <input
        name="cardNumber"
        placeholder="Card Number"
        onChange={handleChange}
      />

      <button type="submit">Confirm Purchase</button>
    </form>
  );
}
