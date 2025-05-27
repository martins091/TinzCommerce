import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  login,
  register,
  requestOTP,
  resetPasswordWithOTP,
  deleteAccount,
} from '../user/userAPI'
import {
  getUserInfoFromStorage,
  setUserInfoToStorage,
  removeUserInfoFromStorage,
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

// Forgot Password – request OTP
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

// Reset Password using OTP
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: getUserInfoFromStorage(),
    loading: false,
    error: null,
    registrationSuccess: false,
    otpSent: false,
    passwordReset: false,
    deleteSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null
      removeUserInfoFromStorage()
      state.registrationSuccess = false
      state.error = null
      state.loading = false
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false
    },
    clearResetFlags: (state) => {
      state.otpSent = false
      state.passwordReset = false
      state.deleteSuccess = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.registrationSuccess = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
        state.registrationSuccess = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.registrationSuccess = false
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        setUserInfoToStorage(action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Forgot Password (OTP)
      .addCase(requestOTPThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.otpSent = false
      })
      .addCase(requestOTPThunk.fulfilled, (state) => {
        state.loading = false
        state.otpSent = true
      })
      .addCase(requestOTPThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.otpSent = false
      })

      // Reset Password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.passwordReset = false
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false
        state.passwordReset = true
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.passwordReset = false
      })

      // Delete Account
      .addCase(deleteAccountThunk.pending, (state) => {
        state.loading = true
        state.error = null
        state.deleteSuccess = false
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.loading = false
        state.userInfo = null
        state.deleteSuccess = true
      })
      .addCase(deleteAccountThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.deleteSuccess = false
      })
  },
})

export const { logout, resetRegistrationSuccess, clearResetFlags } = userSlice.actions
export default userSlice.reducer
