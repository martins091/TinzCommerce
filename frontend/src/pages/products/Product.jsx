import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsPublicThunk } from '../../features/products/productThunks';

const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Books'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'];

const Products = () => {
  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);

  // Loaded products list
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Search, filter, and sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Fetch products by page, append to products list
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      // Dispatch thunk with page param, unwrap result (adjust if your thunk returns differently)
      const response = await dispatch(getAllProductsPublicThunk(page)).unwrap();

      // Append new products to existing list
      setProducts((prev) => [...prev, ...response.products]);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load products when page changes
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Filter and sort products client-side based on controls
  const filteredProducts = products
    .filter((product) =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Newest') {
        // Assuming products have createdAt or _id increasing with time
        // If no createdAt, compare by _id string lex order
        if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
        return b._id.localeCompare(a._id);
      }
      if (sortBy === 'Best Sellers') return 0; // Placeholder, no data
      return 0;
    });

  // Show more loads next page
  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

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
          {filteredProducts.map(({ _id, name, price, images }) => (
            <div
              key={_id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={images?.[0]?.url || 'https://via.placeholder.com/400'}
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

      {/* Show More Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleShowMore}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Show More Products'}
        </button>
      </div>
    </div>
  );
};

export default Products;
