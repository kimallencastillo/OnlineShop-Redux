import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URL for the API requests
const API_BASE_URL = "http://localhost:5000";

// Define async thunk to fetch product details
export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/singeProduct/${productId}`
      );

      return response?.data;
    } catch (err) {
      // If there's an error, reject the thunk with the error message
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Define initialState of the product details
const initialState = {
  item: [],
  status: null,
  error: null,
};

// Create product details slice
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = "success";
        state.item = action.payload;
        console.log("fulfilled :", state.item);
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default productDetailsSlice.reducer;
