import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrdersReq,
  adminGetAllOrdersReq,
  adminDeleteOrderReq,
  adminUpdateOrderReq,
} from "../../apis/index";

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (arg, thunkAPI) => {
    try {
      const { data } = await getAllOrdersReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminGetAllOrders = createAsyncThunk(
  "orders/adminGetAllOrders",
  async (arg, thunkAPI) => {
    try {
      const { data } = await adminGetAllOrdersReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminDeleteOrder = createAsyncThunk(
  "orders/adminDeleteOrder",
  async (id, thunkAPI) => {
    try {
      const { data } = await adminDeleteOrderReq(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const adminUpdateOrder = createAsyncThunk(
  "orders/adminUpdateOrder",
  async ({ id, orderData }, thunkAPI) => {
    try {
      const { data } = await adminUpdateOrderReq(id, orderData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminGetAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminGetAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(adminGetAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminDeleteOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteOrder.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminDeleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminUpdateOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminUpdateOrder.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminUpdateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
