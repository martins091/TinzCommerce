// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import {
  registerUser,
  loginUser,
  requestOTPThunk,
  resetPasswordThunk,
  deleteAccountThunk,
  updateProfileThunk,
} from './userThunks'
import {
  getUserInfoFromStorage,
  removeUserInfoFromStorage,
  setUserInfoToStorage,
} from '../../utils/localStorage'

const initialState = {
  userInfo: getUserInfoFromStorage(),
  loading: false,
  error: null,
  registrationSuccess: false,
  otpSent: false,
  passwordReset: false,
  deleteSuccess: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
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

      // OTP Request
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
      })

      // Update Profile
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        setUserInfoToStorage(action.payload)
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, resetRegistrationSuccess, clearResetFlags } = userSlice.actions
export default userSlice.reducer
