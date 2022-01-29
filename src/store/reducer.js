import { createSlice } from "@reduxjs/toolkit";

export const dataList = createSlice({
  name: "listData",
  initialState: {
    list: [],
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setList } = dataList.actions;

export default dataList.reducer;
