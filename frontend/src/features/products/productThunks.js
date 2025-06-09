import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductCountByAdmin,
  getAllProductsPublic,
  getSingleProduct,
} from "./productAPI";

// Create Product
export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get All Products by admin
export const getAllProductsThunk = createAsyncThunk(
  "product/getAllProducts",
  async (page = 1, thunkAPI) => {
    try {
      const data = await getAllProducts(page);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get all product by public
export const getAllProductsPublicThunk = createAsyncThunk(
  "product/getAllProductsPublic",
  async (page = 1, thunkAPI) => {
    try {
      return await getAllProductsPublic(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Single Product
export const getSingleProductThunk = createAsyncThunk(
  "product/getSingleProduct",
  async (id, thunkAPI) => {
    try {
      return await getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Update Product
export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      return await updateProduct(id, productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete Product
export const deleteProductThunk = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Product Count by Admin
export const getProductCountByAdminThunk = createAsyncThunk(
  "product/getProductCountByAdmin",
  async (_, thunkAPI) => {
    try {
      return await getProductCountByAdmin();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
