import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetAllProductsReq,
  adminCreateProductReq,
  adminDeleteProductReq,
  adminDeleteReviewReq,
  adminUpdateProductReq,
} from "../../apis/index";
const initialState = {
  products: [],
  productsCount: 0,
};

export const adminDeleteProduct = createAsyncThunk(
  "product/AdminDeleteProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await adminDeleteProductReq(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const adminDeleteReview = createAsyncThunk(
  "product/AdminDeleteReview",
  async (Data, thunkAPI) => {
    try {
      const { data } = await adminDeleteReviewReq(Data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const adminCreateProduct = createAsyncThunk(
  "product/AdminCreateProduct",
  async (productData, thunkAPI) => {
    try {
      const { data } = await adminCreateProductReq(productData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const adminGetAllProduct = createAsyncThunk(
  "product/AdminGetAllProduct",
  async (arg, thunkAPI) => {
    try {
      const { data } = await adminGetAllProductsReq();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const adminUpdateProduct = createAsyncThunk(
  "product/AdminUpdateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const { data } = await adminUpdateProductReq(id, productData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    allProductFailed: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },

    allProductRequest: (state) => {
      return {
        loading: true,
        product: [],
      };
    },

    allProductSuccess: (state, action) => {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    },
    clearError: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminGetAllProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminGetAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    });
    builder.addCase(adminGetAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminCreateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminCreateProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminCreateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminDeleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminDeleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminDeleteReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteReview.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminDeleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(adminUpdateProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminUpdateProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(adminUpdateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  allProductFailed,
  allProductRequest,
  allProductSuccess,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
