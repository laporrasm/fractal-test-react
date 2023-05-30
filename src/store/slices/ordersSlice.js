import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../api/axiosConfig';

const initialState = {
  orders: [],
  isLoading: false,
};

// Thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (thunkAPI) => {
    const response = await api.get('/api/v1/orders');
    console.log(response);
    return response.data;
  }
);

export const postOrder = createAsyncThunk(
  'orders/postOrder',
  async (order, thunkAPI) => {
    console.log(order);
    const response = await api.post('/api/v1/orders', order);
    console.log(response);
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id, thunkAPI) => {
    await api.delete(`/api/v1/orders/${id}`);
    return id;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(postOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ordersSlice.reducer;
