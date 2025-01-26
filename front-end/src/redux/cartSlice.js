import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    deleteCartItem: (state, action) => {
      state.cart = state.cart.filter((elem) => elem._id !== action.payload.id);
    },
  },
});

export default cartSlice.reducer;
export const { setCart, deleteCartItem } = cartSlice.actions;
