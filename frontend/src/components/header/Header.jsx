import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUserCircle, FaBars } from 'react-icons/fa'
import { useState } from 'react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Select userInfo from Redux state (update path if your store key is different)
  const userInfo = useSelector((state) => state.user.userInfo)
  const isAdmin = useSelector((state) => state.user.userInfo.role === 'Admin')
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Tinz<span className="text-gray-800">Commerce</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isAdmin ? (
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          ): null}
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-gray-700 hover:text-blue-600 text-xl" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
          </Link>

          {userInfo ? (
            <>
              <Link to="/profile">
                {userInfo.profileImage ? (
                  <img
                    src={userInfo.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 hover:border-blue-600"
                  />
                ) : (
                  <FaUserCircle className="text-gray-700 hover:text-blue-600 text-xl" />
                )}
              </Link>

            </>
          ) : (
            <Link to="/signin" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
              Sign In
            </Link>
          )}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl">
          <FaBars />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3 shadow-md">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/products" className="block text-gray-700 hover:text-blue-600">Products</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="mr-2" /> Cart
          </Link>

          {userInfo ? (
            <>
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600 space-x-2">
                {userInfo.profileImage ? (
                  <img
                    src={userInfo.profileImage}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <FaUserCircle />
                )}
                <span>Profile</span>
              </Link>
            </>
          ) : (
            <Link to="/signin" className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 text-sm">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
