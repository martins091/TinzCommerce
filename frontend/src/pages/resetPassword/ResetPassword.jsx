import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetPasswordThunk } from '../../features/user/userThunks'
import SuccessModal from '../../components/modal/SuccessModal'

export default function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email || ''

    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleReset = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await dispatch(resetPasswordThunk({ email, otp, newPassword })).unwrap()

            setModalOpen(true)
            setTimeout(() => {
                setModalOpen(false)
                navigate('/signin')
            }, 2000)
        } catch (err) {
            const errorMessage =
                typeof err === 'object' && err?.message ? err.message : err.toString()
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }


    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg font-semibold">
                    Invalid access. Email not found.
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white shadow-lg p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Reset Your Password
                </h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-600 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP Code
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter the OTP sent to your email"
                            className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded transition duration-200 ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>

                </form>
            </div>

            <SuccessModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    navigate('/login')
                }}
                message="Password reset successful. Redirecting to login..."
            />
        </div>
    )
}
