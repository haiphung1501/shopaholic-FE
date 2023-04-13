import { createSlice } from "@reduxjs/toolkit";
import { getOneProductReq } from "../../apis/index";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
    emptyCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

//Actions
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await getOneProductReq(id);
  dispatch(
    addToCart({
      product: data._id,
      name: data.name,
      image: data.images[0].url,
      price: data.price,
      stock: data.stock,
      qty,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCartAction = (id) => async (dispatch, getState) => {
  dispatch(removeFromCart(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export default cartSlice.reducer;
