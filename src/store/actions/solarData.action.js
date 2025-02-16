import { createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeFlares } from "../slices/solarData.slice";

export const fetchSolarData = createAsyncThunk(
  "solarData/fetchSolarData",
  async () => {
    try {
      const response = await fetch(
        "https://backendsolar-production.up.railway.app/solar-flare/data"
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const analyzeSolarData = () => async (dispatch) => {
  dispatch(analyzeFlares());
};

const convertSolarToEarthCoords = (sourceLocation) => {
  if (!sourceLocation) return null;

  const match = sourceLocation.match(/([NS])(\d+)([EW])(\d+)/);
  if (!match) return null;

  const [, latDir, lat, lonDir, lon] = match;
  let earthLat = parseInt(lat, 10);
  let earthLon = parseInt(lon, 10);

  if (latDir === "S") earthLat *= -1;
  if (lonDir === "W") earthLon = 360 - earthLon;

  return { lat: earthLat, lon: earthLon };
};

export const fetchSolarFlares = createAsyncThunk(
  "solar/fetchFlares",
  async () => {
    const response = await fetch("https://example.com/api/flares");
    const data = await response.json();

    const affectedAreas = data
      .map((flare) => convertSolarToEarthCoords(flare.sourceLocation))
      .filter(Boolean);

    return affectedAreas;
  }
);
