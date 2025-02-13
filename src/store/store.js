import { configureStore } from "@reduxjs/toolkit";
import solarDataSlice from "../store/slices/solarData.slice";

export const store = configureStore({
  reducer: {
    solarData: solarDataSlice,
  },
});

export default store;
