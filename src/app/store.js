import { configureStore } from "@reduxjs/toolkit";
import setUserIdSlice from "../features/UserIdSlice";
import setCartTotal from "../features/CartAmountSlice";

export const store = configureStore({
  reducer: {
    userId: setUserIdSlice,
    cartAmount: setCartTotal,
  },
});
