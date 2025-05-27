import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/products/productSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
})
