import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/user/userSlice'
import SuccessModal from '../../components/modal/SuccessModal'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, userInfo } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalError, setModalError] = useState(false)

  const handleSignIn = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  // 🚫 Redirect already logged-in users
  useEffect(() => {
    if (userInfo) {
      navigate('/products') // redirect to products or dashboard
    }
  }, [userInfo, navigate])

  useEffect(() => {
    // Show modal only if user just signed in or there's an error
    if (userInfo) {
      setModalMessage('Signed in successfully!')
      setModalError(false)
      setModalOpen(true)
    } else if (error) {
      setModalMessage(typeof error === 'string' ? error : error.message || 'Sign in failed')
      setModalError(true)
      setModalOpen(true)
    }
  }, [userInfo, error])

  const closeModal = () => {
    setModalOpen(false)

    if (!modalError && userInfo) {
      setEmail('')
      setPassword('')
      navigate('/products') // redirect again just in case
    }
  }

  return (
    <>
      <div className="flex h-screen">
        {/* Left side image */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-10">
          <img
            src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="ecommerce"
            className="rounded-lg shadow-xl"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <form onSubmit={handleSignIn} className="w-full max-w-md space-y-6 z-20">
            <h2 className="text-3xl font-bold text-blue-700 text-center">Welcome Back</h2>
            <p className="text-center text-gray-500">Please sign in to continue shopping</p>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className=" mt-1">
              <Link to="/forgotpassword" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-blue-700 font-medium">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Success/Error Modal */}
      <SuccessModal
        isOpen={modalOpen}
        onClose={closeModal}
        isError={modalError}
        message={modalMessage}
      />
    </>
  )
}

export default Signin
