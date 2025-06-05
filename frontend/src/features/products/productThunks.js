import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProducts
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
