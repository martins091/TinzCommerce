import React, { useState } from 'react';

const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Books'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'];

// Placeholder products data
const productsData = [
  {
    id: 2,
    name: 'Men’s Jacket',
    price: 99.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Men’s Jacket',
    price: 99.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80',
  },


{
  id: 3,
  name: 'Leather Wallet',
  price: 29.99,
  category: 'Accessories',
  image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
},
{
  id: 3,
  name: 'Leather Wallet',
  price: 29.99,
  category: 'Accessories',
  image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
},

  {
    id: 4,
    name: 'Fiction Novel',
    price: 19.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Fiction Novel',
    price: 19.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Smartwatch',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Smartwatch',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Filter products based on search and category
  const filteredProducts = productsData
    .filter((product) => 
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Newest') return b.id - a.id; // assuming higher ID is newer
      if (sortBy === 'Best Sellers') return 0; // Placeholder, no real data yet
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Our Products</h1>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(({ id, name, price, image }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
                <p className="text-indigo-600 font-bold mt-2">${price.toFixed(2)}</p>
                <button
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
                  onClick={() => alert(`Add "${name}" to cart`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">No products found.</p>
      )}
    </div>
  );
};

export default Products;
