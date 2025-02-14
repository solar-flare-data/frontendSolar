import { createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeFlares } from "../slices/solarData.slice";

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

export const analyzeSolarData = () => async (dispatch, getState) => {
  dispatch(analyzeFlares());
};
