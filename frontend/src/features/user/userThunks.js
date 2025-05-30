import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  login,
  register,
  requestOTP,
  resetPasswordWithOTP,
  deleteAccount,
  updateProfile,
  logoutUser
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
      return await login(credentials)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

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

