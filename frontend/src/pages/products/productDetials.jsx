import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import { getSingleProductThunk } from '../../features/products/productThunks';
import { clearSingleProduct } from '../../features/products/productSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const publicProducts = useSelector((state) => state.product?.publicProducts || []);
  const singleProduct = useSelector((state) => state.product?.singleProduct || null);
  const loading = useSelector((state) => state.product?.loading || false);

  const product = useMemo(() => {
    return publicProducts.find((p) => p._id === id) || singleProduct;
  }, [publicProducts, singleProduct, id]);

  useEffect(() => {
    dispatch(clearSingleProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if (!product && id) {
      dispatch(getSingleProductThunk(id))
        .unwrap()
        .catch((err) => console.error('Error fetching product:', err));
    }
  }, [dispatch, id, product]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500 text-lg font-semibold">
        Loading product details or product not found...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-16 px-6 md:px-12 lg:px-24 font-sans text-gray-900">
      <button
        onClick={() => navigate('/products')}
        className="mb-10 inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
        aria-label="Back to Shop"
      >
        <svg
          className="w-5 h-5 transform -translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>Back to Shop</span>
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-white">
          <img
            src={product.images?.[0]?.url || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-indigo-900 drop-shadow-lg">
            {product.name}
          </h1>

          <div className="flex items-center space-x-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={26}
                strokeWidth={1.5}
                fill={i < product.ratings ? 'url(#starGradient)' : 'none'}
                className={`transition-colors duration-300 ${
                  i < product.ratings ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-gray-500 text-lg ml-3">
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <p className="text-4xl font-bold text-indigo-700">${product.price?.toFixed(2)}</p>

          <p className="text-lg text-gray-700 leading-relaxed max-w-xl">{product.description}</p>

          <div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
                product.countInStock > 0
                  ? 'bg-green-100 text-green-900'
                  : 'bg-red-100 text-red-900'
              }`}
            >
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <button
            className={`relative overflow-hidden group rounded-xl px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 ${
              product.countInStock > 0
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={product.countInStock === 0}
            aria-label={product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
          >
            <span className="relative z-10"> 
              {product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
            </span>
            <span
              className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-20 border-t border-indigo-200 pt-8">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-6 tracking-wide">Product Details</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{product.description || 'No additional information available.'}</p>
      </div>

      {/* SVG gradient for stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="starGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ProductDetails;
