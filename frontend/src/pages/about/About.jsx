import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-700 text-white py-24 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
            Welcome to TinzWave Store
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for quality electronics, accessories, and lifestyle products. At TinzWave, we combine innovation with unbeatable prices to deliver an unmatched shopping experience.
          </p>
        </div>
        {/* Decorative SVG Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#f9fafb"
            d="M0,224L1440,96L1440,320L0,320Z"
          />
        </svg>
      </section>

      {/* Our Promise Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg className="mx-auto mb-4 w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
          <p className="text-gray-600">
            We source the best products, ensuring durability and top performance.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg className="mx-auto mb-4 w-12 h-12 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V3M9 21h3M9 3h3" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
          <p className="text-gray-600">
            Enjoy quick delivery straight to your doorstep with real-time tracking.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <svg className="mx-auto mb-4 w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 .88-.39 1.67-1 2.22m-6 1.78a8.001 8.001 0 0114-5.13M12 3v5" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600">
            We're here for you 24/7 to ensure smooth and happy shopping.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team Behind TinzWave</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                name: 'Martin Ejiofor',
                role: 'Founder & CEO',
                image:
                  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
              },
              {
                name: 'Aisha Bello',
                role: 'Operations Manager',
                image:
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
              },
              {
                name: 'David Okoro',
                role: 'Lead Product Specialist',
                image:
                  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
              },
              {
                name: 'Grace Uche',
                role: 'Customer Support Lead',
                image:
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
              },
            ].map(({ name, role, image }, i) => (
              <div
                key={i}
                className="text-center rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{name}</h3>
                  <p className="text-indigo-600">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-700 text-white text-center py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-4">Ready to shop the best?</h2>
        <p className="max-w-xl mx-auto mb-6 text-lg">
          Discover exclusive deals and the latest products only at TinzWave Store.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default About;
