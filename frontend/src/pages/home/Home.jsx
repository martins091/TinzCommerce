
import HeroSection from '../../components/home-sections/HeroSection';
import TestimonialSlider from '../../components/home-sections/Testimonia';
import WhyShopWithUs from '../../components/home-sections/WhyShopWithUs';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
     <HeroSection />

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img
              src="https://img.icons8.com/fluency/96/delivery.png"
              alt="Fast Shipping"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Get your orders quickly and on time, always.</p>
          </div>
          <div>
            <img
              src="https://img.icons8.com/fluency/96/refund.png"
              alt="Return Policy"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Easy Returns</h3>
            <p className="text-gray-600 mt-2">No questions asked — return within 7 days.</p>
          </div>
          <div>
            <img
              src="https://img.icons8.com/fluency/96/customer-support.png"
              alt="Customer Support"
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
            <p className="text-gray-600 mt-2">We’re here anytime you need help.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Placeholder) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
          <p className="text-gray-600 mb-8">We’ll display your top products here when backend is connected.</p>

          {/* Placeholder for product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 shadow rounded-lg animate-pulse">
                <div className="w-full h-40 bg-gray-200 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 mb-2 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Testimonial Section */}
            <TestimonialSlider />

      {/*  Why Shop With Us Section */}
      <WhyShopWithUs />
      
    </div>
  );
};

export default Home;
