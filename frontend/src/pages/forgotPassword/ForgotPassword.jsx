import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestOTPThunk } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import SuccessModal from '../../components/modal/SuccessModal'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await dispatch(requestOTPThunk(email)).unwrap()
      setModalMessage('OTP sent to your email!')
      setModalOpen(true)
    } catch (err) {
      const errorMsg =
        typeof err === 'object' && err?.message
          ? err.message
          : err.toString()
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    navigate('/resetpassword', { state: { email } })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-md w-full bg-white shadow p-6 rounded-lg z-20">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {error && (
          <p className="text-red-500 mb-3">
            {typeof error === 'object' ? error.message : error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>

      <SuccessModal
        isOpen={modalOpen}
        onClose={closeModal}
        isError={false}
        message={modalMessage}
      />
    </div>
  )
}
