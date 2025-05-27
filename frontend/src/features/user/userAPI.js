import API from '../../services/axios'

export const register = async (userData) => {
  const response = await API.post('/users/register', userData)
  return response.data
}

export const login = async (credentials) => {
  const response = await API.post('/users/login', credentials)
  return response.data
}

// Forgot Password – Send OTP
export const requestOTP = async (email) => {
  const response = await API.post('/users/forgot-password', { email })
  return response.data
}

// Reset Password with OTP
export const resetPasswordWithOTP = async ({ email, otp, newPassword }) => {
  const response = await API.post('/users/reset-password', {
    email,
    otp,
    newPassword,
  })
  return response.data
}

// Delete user account (must be authenticated)
export const deleteAccount = async () => {
  const response = await API.delete('/users/delete-account')
  return response.data
}
