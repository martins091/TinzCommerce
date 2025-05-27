import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const TAX_RATE = 0.07; // 7% tax example

const Cart = () => {
  // Dummy cart data, replace with your state or props
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 149.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1510557880182-3a9356efae4f?auto=format&fit=crop&w=150&q=80',
    },
  ]);

  // Handlers
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-100 to-white text-gray-700">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-6 text-lg">Looks like you haven’t added anything to your cart yet.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
          Shopping Cart
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Items List */}
          <div className="flex-1">
            {cartItems.map(({ id, image, name, price, quantity }) => (
              <div
                key={id}
                className="flex items-center bg-gray-100 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                  <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <label htmlFor={`qty-${id}`} className="text-gray-700 font-medium">Qty:</label>
                  <input
                    id={`qty-${id}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(id, parseInt(e.target.value, 10))}
                    className="w-16 text-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleRemove(id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Item"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full md:w-96 bg-blue-50 rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Order Summary</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between font-extrabold text-lg text-blue-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-8 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
