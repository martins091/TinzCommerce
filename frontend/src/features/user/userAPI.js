import API from '../../services/axios'
import { getAuthHeaders } from '../../utils/authHeader'

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
 
// deleted Account
export const deleteAccount = async () => {
  const headers = getAuthHeaders()
  const response = await API.delete('/users/delete-account', { headers })
  return response.data
}


// Update Profile
export const updateProfile = async (updatedData) => {
  const response = await API.put('/users/update-profile', updatedData)
  return response.data
}

// Logout user
export const logoutUser = async () => {
  const response = await axios.post('/user/logout')
  return response.data
}