import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  items: [],
  status: null,
  error: null,
};

// fetching data using createAsyncThunk
export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    const response = await axios.get(
      'https://onlineshop-redux-backend.onrender.com/products'
    );
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        // immer
        // updating the state of a mutable state
        state.status = 'pending';
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
