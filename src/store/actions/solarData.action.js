import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSolarData = createAsyncThunk(
  "solarData/fetchSolarData",
  async () => {
    try {
      const response = await fetch(
        "https://backend-production-c43b.up.railway.app/solar-flare-data/"
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
