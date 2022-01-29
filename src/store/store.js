import { configureStore } from "@reduxjs/toolkit";
import dataListStore from "./reducer";

const store = configureStore({
  reducer: {
    dataListStore,
  },
});

export default store;
