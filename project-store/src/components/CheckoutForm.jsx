import { useState } from "react";

export default function CheckoutForm({ cart, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
  });

  const [errors, setErrors] = useState({});

  const API_URL =
    import.meta.env.VITE_API_URL || "https://dzshop-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
          Authorization: token,
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
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      {errors.fullName && <p>{errors.fullName}</p>}

      <input name="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <p>{errors.email}</p>}

      <input name="address" placeholder="Address" onChange={handleChange} />
      {errors.address && <p>{errors.address}</p>}

      <input name="cardNumber" placeholder="Card Number" onChange={handleChange} />
      {errors.cardNumber && <p>{errors.cardNumber}</p>}

      <button type="submit">Confirm Purchase</button>
    </form>
  );
}
