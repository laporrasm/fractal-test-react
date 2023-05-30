import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../api/axiosConfig';

const initialState = {
  products: [],
  isGetLoading: false,
  isPostLoading: false,
  isDeleteLoading: false,
};

// Thunks
export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (product, thunkAPI) => {
    const response = await api.post('/api/v1/products', product);
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (thunkAPI) => {
    const response = await api.get('/api/v1/products');
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, thunkAPI) => {
    await api.delete(`/api/v1/products/${productId}`);
    return productId;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (state) => {
        state.isPostLoading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isPostLoading = false;
        state.products.push(action.payload);
      })
      .addCase(postProduct.rejected, (state) => {
        state.isPostLoading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isGetLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isGetLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isGetLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isDeleteLoading = false;
        state.products = state.products.filter(
          (prod) => prod.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isDeleteLoading = false;
      });
  },
});

export default productsSlice.reducer;
