
import authReducer from "../features/Auth/redux/authSlice"
import cartReducer from "../features/Cart/redux/cartSlice"

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
