import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  login,
  register,
  requestOTP,
  resetPasswordWithOTP,
  deleteAccount,
  updateProfile,
  logoutUser,
  getUserProfile,
  getAllUsers,
  editUserRole,
  deleteUserByAdmin
} from './userAPI'

import {
  removeUserInfoFromStorage,
  setUserInfoToStorage
} from '../../utils/localStorage'

// Register
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, thunkAPI) => {
    try {
      return await register(userData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials); // call API

      // Assuming API response looks like { token, user }
      const { token, user } = response;

      // Combine user info + token
      const userInfo = { ...user, token };

      // Save to localStorage
      setUserInfoToStorage(userInfo);

      // Return combined object as fulfilled payload
      return userInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Request OTP
export const requestOTPThunk = createAsyncThunk(
  'user/requestOTP',
  async (email, thunkAPI) => {
    try {
      return await requestOTP(email)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Reset Password
export const resetPasswordThunk = createAsyncThunk(
  'user/resetPassword',
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      return await resetPasswordWithOTP({ email, otp, newPassword })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Delete Account
export const deleteAccountThunk = createAsyncThunk(
  'user/deleteAccount',
  async (_, thunkAPI) => {
    try {
      const response = await deleteAccount()
      removeUserInfoFromStorage()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Update Profile
export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async (updatedData, thunkAPI) => {
    try {
      return await updateProfile(updatedData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// logout
export const logoutThunk = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutUser()
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
  }
})

// ✅ Get User Profile
export const getUserProfileThunk = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfile()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// ✅ Get All Users (Admin)
export const getAllUsersThunk = createAsyncThunk(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await getAllUsers()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// ✅ Edit User Role (Admin)
export const editUserRoleThunk = createAsyncThunk(
  'user/editUserRole',
  async ({ userId, role }, thunkAPI) => {
    try {
      const response = await editUserRole(userId, role)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

// ✅ Delete User by Admin
export const deleteUserByAdminThunk = createAsyncThunk(
  'user/deleteUserByAdmin',
  async (userId, thunkAPI) => {
    try {
      const response = await deleteUserByAdmin(userId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)