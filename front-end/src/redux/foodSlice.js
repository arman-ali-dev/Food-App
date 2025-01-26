import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
  },
  reducers: {
    setFoods: (state, action) => {
      state.foods = action.payload;
    },
  },
});

export default foodSlice.reducer;
export const { setFoods } = foodSlice.actions;
