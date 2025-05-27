import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SuccessModal from '../../components/modal/SuccessModal'
import { registerUser } from '../../features/user/userThunks'
import { resetRegistrationSuccess } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, registrationSuccess } = useSelector((state) => state.user)

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(form))
    setForm({ name: '', email: '', password: '' })
  }

  // Show success modal when registrationSuccess is true
  useEffect(() => {
    if (registrationSuccess) {
      setIsError(false)
      setModalMessage('Registration successful!')
      setIsModalOpen(true)
    }
  }, [registrationSuccess])

  // Show error modal when error exists
  useEffect(() => {
    if (error) {
      setIsError(true)
      setModalMessage(error)
      setIsModalOpen(true)
    }
  }, [error])

  const closeModal = () => {
    setIsModalOpen(false)

    if (!isError && registrationSuccess) {
      // Reset the success flag in redux
      dispatch(resetRegistrationSuccess())
      // Redirect to signin page
      navigate('/signin')
    }
  }

  return (
    <div className="flex h-screen">
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isError={isError}
        message={modalMessage}
      />

      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-10">
        <img
          src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="register"
          className="rounded-lg shadow-xl"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white relative">
        {/* Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 z-20">
          <h2 className="text-3xl font-bold text-blue-700 text-center">Create Your Account</h2>
          <p className="text-center text-gray-500">Join TinzWave and enjoy quality shopping</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/signin" className="text-blue-700 font-medium">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
