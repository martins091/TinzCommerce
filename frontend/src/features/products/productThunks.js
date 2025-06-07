import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
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

// Get All Products
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