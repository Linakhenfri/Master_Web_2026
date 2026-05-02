import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

export default function Cart() {
  const { cart, removeFromCart, decreaseQty } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                <h3>{item.title}</h3>
                <p>Qty: {item.quantity}</p>
                <p>${item.price}</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          <h2>Total: ${totalPrice.toFixed(2)}</h2>

          <button onClick={() => setShowCheckout(true)}>
            Proceed to Checkout
          </button>
        </>
      )}

      {showCheckout && (
        <CheckoutForm
          cart={cart}
          onSuccess={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
