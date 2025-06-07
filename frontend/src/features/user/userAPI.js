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


export const updateProfile = async (updatedData) => {
  const headers = getAuthHeaders();

  // If updatedData is FormData, don't manually set 'Content-Type'
  if (updatedData instanceof FormData) {
    delete headers['Content-Type']; // Let the browser/axios handle it
  }

  const response = await API.put('/users/profile-update', updatedData, { headers });
  return response.data;
};



// Logout user
export const logoutUser = async () => {
  const headers = getAuthHeaders();
  const response = await API.post('/users/logout', {}, { headers });
  return response.data;
};


// ✅ NEW: Get User Profile
export const getUserProfile = async () => {
  const headers = getAuthHeaders()
  const response = await API.get('/users/profile', { headers })
  return response.data
}

// ✅ NEW: Get All Users (Admin)
export const getAllUsers = async () => {
  const headers = getAuthHeaders()
  const response = await API.get('/users/admin-get-all-users', { headers })
  return response.data
}

// ✅ NEW: Edit User Role (Admin)
export const editUserRole = async (userId, role) => {
  const headers = getAuthHeaders()
  const response = await API.put(`/users/admin-edit-user-role/${userId}`, { role }, { headers })
  return response.data
}

// ✅ NEW: Delete User by Admin
export const deleteUserByAdmin = async (userId) => {
  const headers = getAuthHeaders()
  const response = await API.delete(`/users/admin-delete-user/${userId}`, { headers })
  return response.data
}