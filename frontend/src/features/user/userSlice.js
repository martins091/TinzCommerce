import { createSlice } from '@reduxjs/toolkit'
import {
  registerUser,
  loginUser,
  requestOTPThunk,
  resetPasswordThunk,
  deleteAccountThunk,
  updateProfileThunk,
  getUserProfileThunk,
  getAllUsersThunk,
  editUserRoleThunk,
  deleteUserByAdminThunk,
  getUserCountByAdminThunk,
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
  allUsers: [], // ✅ Added this
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
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
        removeUserInfoFromStorage()
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
        state.error = null
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Get User Profile
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = {
          ...state.userInfo,
          ...action.payload,
        }
        setUserInfoToStorage(state.userInfo)
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Get All Users (Admin)
      .addCase(getAllUsersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.allUsers = action.payload
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Edit User Role (Admin)
      .addCase(editUserRoleThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editUserRoleThunk.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload
        if (state.allUsers) {
          const index = state.allUsers.findIndex(user => user._id === updatedUser._id)
          if (index !== -1) {
            state.allUsers[index] = updatedUser
          }
        }
      })
      .addCase(editUserRoleThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete User by Admin
      .addCase(deleteUserByAdminThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserByAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        const deletedUserId = action.payload._id
        if (state.allUsers) {
          state.allUsers = state.allUsers.filter(user => user._id !== deletedUserId)
        }
      })
      .addCase(deleteUserByAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get User Count (Admin)
      .addCase(getUserCountByAdminThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserCountByAdminThunk.fulfilled, (state, action) => {
        state.loading = false
        state.userCount = action.payload.count // Assuming the response has a 'count' field
      })
      .addCase(getUserCountByAdminThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

  },
})

export const {
  logoutUser,
  resetRegistrationSuccess,
  clearResetFlags,
} = userSlice.actions

export default userSlice.reducer
