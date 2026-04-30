import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="p-4 bg-background dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-textDark dark:text-white">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-textDark dark:text-gray-300">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-secondary dark:bg-gray-700 p-2 rounded"
              >
                <span className="text-textDark dark:text-white">{item.title}</span>
                <span className="font-bold text-primary dark:text-yellow-400">
                  ${item.price?.toFixed(2) || "0.00"}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-primary dark:bg-yellow-500 text-background dark:text-textDark px-2 py-1 rounded hover:bg-[#a03366] dark:hover:bg-yellow-400 transition"
                >
                  Remove
                </button>
              </div>
            ))}
            <h2 className="mt-4 font-bold text-textDark dark:text-white">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>

          {/* زر Checkout */}
          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 bg-green-600 dark:bg-green-500 text-white dark:text-black px-4 py-2 rounded hover:bg-green-700 dark:hover:bg-green-400 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      {/* مودال Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-textDark dark:text-white">Checkout</h2>
            <CheckoutForm onSuccess={() => setShowCheckout(false)} />
          </div>
        </div>
      )}
    </div>
  );
}