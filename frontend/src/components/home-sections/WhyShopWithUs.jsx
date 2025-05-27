// You can place this section below Featured Products in Home.jsx

import { FaShippingFast, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const WhyShopWithUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Why Shop With Us
        </h2>

        <div className="grid gap-10 md:grid-cols-3 text-left">
          {/* Fast Delivery */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-indigo-600 text-4xl mb-4">
              <FaShippingFast />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable Delivery</h3>
            <p className="text-gray-600 text-sm">
              We deliver your products to your doorstep quickly and safely anywhere in Nigeria.
            </p>
          </div>

          {/* Secure Payments */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-indigo-600 text-4xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">
              Shop with peace of mind knowing your transactions are protected by industry standards.
            </p>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-indigo-600 text-4xl mb-4">
              <FaHeadset />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600 text-sm">
              Our support team is available around the clock to help you with anything you need.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;
