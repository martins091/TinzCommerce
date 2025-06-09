import { createSlice } from '@reduxjs/toolkit';
import {
  createProductThunk,
  getAllProductsThunk,
  updateProductThunk,
  deleteProductThunk,
  getProductCountByAdminThunk,
  getAllProductsPublicThunk,
  getSingleProductThunk,
} from './productThunks';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,

    // 👇 Add for admin dashboard stats
    productCount: 0,
    productLoading: false,

    // Add singleProduct to hold product detail data
    singleProduct: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // NEW reducer to clear singleProduct
    clearSingleProduct: (state) => {
      state.singleProduct = null;
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

    // GET ALL PRODUCTS Admin
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

    // GET ALL PRODUCTS Public
    builder
      .addCase(getAllProductsPublicThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsPublicThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(getAllProductsPublicThunk.rejected, (state, action) => {
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

    // GET PRODUCT COUNT BY ADMIN
    builder
      .addCase(getProductCountByAdminThunk.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(getProductCountByAdminThunk.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productCount = action.payload.count || 0;
      })
      .addCase(getProductCountByAdminThunk.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      });

    // GET SINGLE PRODUCT BY ID
    builder
      .addCase(getSingleProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.singleProduct = null;  // reset while loading
      })
      .addCase(getSingleProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleProduct = null;
      });
  },
});

export const { setPage, clearSingleProduct } = productSlice.actions;
export default productSlice.reducer;
