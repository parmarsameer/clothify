import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const setUserIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, id) => {
      state.value = id.payload;
    },
  },
});

export const { setUserId } = setUserIdSlice.actions;
export default setUserIdSlice.reducer;
