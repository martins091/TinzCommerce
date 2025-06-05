import { createSlice } from '@reduxjs/toolkit';
import { createProductThunk, getAllProductsThunk } from './productThunks';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],     
    loading: false,   
    error: null,
    page: 1,
    totalPages: 0,     
  },
  reducers: {
    // Optional: Add reducer to reset or update page if needed
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // CREATE PRODUCT
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // API returns newly created product
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET ALL PRODUCTS
    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || []; // Make sure to match backend response
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
