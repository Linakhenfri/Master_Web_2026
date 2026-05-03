import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

export default function Cart() {
  const { cart, removeFromCart, decreaseQty, increaseQty } =
    useContext(CartContext);

  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
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
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 border-b pb-3"
            >
              {/* product info */}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  ${item.price}
                </p>
              </div>

              {/* quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="font-bold">
                  {item.quantity || 1}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              {/* remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 bg-primary text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      {/* Checkout */}
      {showCheckout && (
        <div className="mt-6 p-4 border rounded bg-white shadow-lg">
          <CheckoutForm
            cart={cart}
            onSuccess={() => setShowCheckout(false)}
          />
        </div>
      )}
    </div>
  );
}
