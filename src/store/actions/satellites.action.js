import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSatellites = createAsyncThunk(
  "satellites/fetchSatellites",
  async () => {
    const response = await fetch(
      "https://backendsolar-production.up.railway.app/satellites"
    );
    const data = await response.json();
    return data;
  }
);
