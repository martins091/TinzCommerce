import { createSlice } from '@reduxjs/toolkit';
import { 
  createProductThunk, 
  getAllProductsThunk, 
  updateProductThunk, 
  deleteProductThunk 
} from './productThunks';

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
        state.products.push(action.payload);
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
        state.products = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE PRODUCT
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(p => p._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // DELETE PRODUCT
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.id || action.payload._id;
        state.products = state.products.filter(p => p._id !== deletedId);
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
