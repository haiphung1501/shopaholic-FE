import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {
    productDetailRequest: (state) => {
      state.loading = true;
    },
    productDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    productDetailFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.product = {};
    },
  },
});

export const {
  productDetailRequest,
  productDetailSuccess,
  productDetailFailed,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
