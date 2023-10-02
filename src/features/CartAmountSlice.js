import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalMrp: 0,
  mrpDiscount: 0,
  totalAmount: 0,
};

export const CartAmountSlice = createSlice({
  name: "cartAmount",
  initialState,
  reducers: {
    setCartTotalMrp: (state, totalPrice) => {
      state.totalMrp = totalPrice.payload;
    },
    setCartDiscount: (state) => {
      state.mrpDiscount = (state.totalMrp * 10) / 100;
    },
    setTotalAmount: (state) => {
      state.totalAmount = state.totalMrp - state.mrpDiscount;
    },
  },
});

export const { setCartTotalMrp, setCartDiscount, setTotalAmount } =
  CartAmountSlice.actions;
export default CartAmountSlice.reducer;
