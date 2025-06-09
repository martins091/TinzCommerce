import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsPublicThunk } from '../../features/products/productThunks';
import HeroSection from '../../components/home-sections/HeroSection';
import TestimonialSlider from '../../components/home-sections/Testimonia';
import WhyShopWithUs from '../../components/home-sections/WhyShopWithUs';

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch first page of products when component mounts
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(getAllProductsPublicThunk({ page: 1 }));
        if (getAllProductsPublicThunk.fulfilled.match(resultAction)) {
          setProducts(resultAction.payload.products || []);
        }
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [dispatch]);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[{
            icon: "https://img.icons8.com/fluency/96/delivery.png",
            title: "Fast Delivery",
            description: "Get your orders quickly and on time, always.",
          }, {
            icon: "https://img.icons8.com/fluency/96/refund.png",
            title: "Easy Returns",
            description: "No questions asked — return within 7 days.",
          }, {
            icon: "https://img.icons8.com/fluency/96/customer-support.png",
            title: "24/7 Support",
            description: "We’re here anytime you need help.",
          }].map(({ icon, title, description }) => (
            <div key={title} className="flex flex-col items-center">
              <img src={icon} alt={title} className="mb-6 w-20 h-20" />
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 max-w-xs">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
     <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6 max-w-7xl">
    <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
      Featured Products
    </h2>

    {loading ? (
      <p className="text-center text-gray-500 text-lg">Loading products...</p>
    ) : products.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">No featured products available.</p>
    ) : (
      <div
        className="overflow-x-auto px-16"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div
          className="inline-flex space-x-10 justify-center w-full"
          style={{ minWidth: 'fit-content' }}
        >
          {products.slice(0, 4).map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-64 h-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer scroll-snap-align-start"
              onClick={() => alert(`Clicked on ${product.name}`)}
            >
              <div className="overflow-hidden rounded-t-xl h-48 bg-gray-100">
                <img
                  src={product.images?.[0]?.url || 'https://via.placeholder.com/256x192'}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3
                  title={product.name}
                  className="text-xl font-semibold text-gray-900 truncate mb-2"
                >
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold text-2xl">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</section>
      {/* Testimonial Section */}
      <TestimonialSlider />

      {/* Why Shop With Us Section */}
      <WhyShopWithUs />
    </div>
  );
};

export default Home;
