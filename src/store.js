import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import productReducer from "./features/product/productSlice";
import productDetailReducer from "./features/product/productDetailSlice";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import orderDetailReducer from "./features/order/orderDetailSlice";
import orderReducer from "./features/order/orderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  cart: cartReducer,
  orderDetail: orderDetailReducer,
  orders: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: false,
});

export let persistor = persistStore(store);

export default store;
