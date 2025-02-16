import { createSlice } from "@reduxjs/toolkit";
import { fetchSatellites } from "./satelliteActions";

const satelliteSlice = createSlice({
  name: "satellites",
  initialState: {
    satellites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSatellites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSatellites.fulfilled, (state, action) => {
        state.loading = false;
        state.satellites = action.payload;
      })
      .addCase(fetchSatellites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch satellites";
      });
  },
});

export default satelliteSlice.reducer;
