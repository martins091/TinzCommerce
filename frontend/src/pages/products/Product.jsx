import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductsPublicThunk } from '../../features/products/productThunks';

const categories = ['All', 'Electronics', 'Clothing', 'Accessories', 'Books'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'];

const Products = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await dispatch(getAllProductsPublicThunk(page)).unwrap();
      setProducts((prev) => [...prev, ...response.products]);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const filteredProducts = products
    .filter((product) =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Newest') {
        if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
        return b._id.localeCompare(a._id);
      }
      return 0;
    });

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
            <Link
              to={`/product/${_id}`}
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
                <div className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-center">
                  View Details
                </div>
              </div>
            </Link>
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
