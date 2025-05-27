import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../assets/images/img2.jpg'
import img2 from '../../assets/images/img1.jpg'


const images = [img1, img2]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[600px] w-full overflow-hidden  rounded-lg shadow-lg">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-center  bg-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10 zoom-in' : 'opacity-0 z-0' 
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center  justify-center text-center px-6">
        <h1 className="text-4xl z-10 md:text-6xl font-bold text-white leading-tight mb-4">
          Welcome to <span className="text-blue-400">TinzCommerce</span>
        </h1>
        <p className="max-w-xl z-10 mx-auto text-lg md:text-xl text-white mb-6">
          Discover the latest tech gadgets, accessories, and essentials at unbeatable prices.
        </p>
        <Link
          to="/products"
          className="bg-blue-500 z-10 hover:bg-blue-600 transition px-6 py-3 rounded-full text-white font-semibold"
        >
          Shop Now
        </Link>
      </div>

      {/* Styles */}
      <style>{`
        .zoom-in {
          animation: zoomInAnim 5s forwards;
        }

        @keyframes zoomInAnim {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  )
}
