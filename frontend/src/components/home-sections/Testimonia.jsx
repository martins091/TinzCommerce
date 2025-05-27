// src/components/TestimonialSlider.jsx
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fashion Enthusiast',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Absolutely love the products! High quality and fast delivery. Will definitely shop again.',
  },
  {
    name: 'David Kings',
    role: 'Tech Blogger',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'This store has the best tech accessories I’ve found. The experience was seamless.',
  },
  {
    name: 'Linda Matthews',
    role: 'Mom & Homemaker',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'I appreciate the customer service — super responsive and helpful!',
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What Our Customers Are Saying
        </h2>

        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4">
                <FaQuoteLeft className="text-4xl text-indigo-600" />
                <p className="text-gray-700 text-base italic max-w-xl mx-auto">{item.quote}</p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSlider;
