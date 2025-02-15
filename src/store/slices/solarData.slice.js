import { createSlice } from "@reduxjs/toolkit";
import { fetchSolarData } from "../actions/solarData.action";
import analyzeFlare from "../actions/flareAnalysis";

const initialState = {
  data: [],
  anomalies: [],
  analyzedData: [],
  affectedAreas: [],
  loading: false,
  error: null,
};

const solarDataSlice = createSlice({
  name: "solarData",
  initialState,
  reducers: {
    detectAnomalies: (state) => {
      state.anomalies = state.data.filter((event) => isAnomalous(event));
    },
    analyzeFlares: (state) => {
      state.analyzedData = state.data.map((flare) => {
        const analysis = analyzeFlare(flare);
        return { ...flare, ...analysis };
      });
    },
    updateAffectedAreas: (state) => {
      state.affectedAreas = state.data
        .map((flare) => convertSolarToEarthCoords(flare.sourceLocation))
        .filter(Boolean);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolarData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSolarData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSolarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const isAnomalous = (event) => {
  const {
    classType,
    beginTime,
    endTime,
    sourceLocation,
    activeRegionNum,
    linkedEvents,
  } = event;
  const classLetter = classType[0];
  const classNumber = parseFloat(classType.slice(1));

  const isStrongFlare =
    classLetter === "X" || (classLetter === "M" && classNumber >= 5);
  const flareDuration = new Date(endTime) - new Date(beginTime);
  const isLongFlare = flareDuration > 2 * 60 * 60 * 1000;
  const isCloseToEarth =
    sourceLocation.includes("E0") || sourceLocation.includes("W0");
  const isUnknownRegion = activeRegionNum === null;
  const hasCME = linkedEvents?.some((event) =>
    event.activityID.includes("CME")
  );

  return (
    isStrongFlare || isLongFlare || isCloseToEarth || isUnknownRegion || hasCME
  );
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

export const { detectAnomalies, analyzeFlares, updateAffectedAreas } =
  solarDataSlice.actions;
export default solarDataSlice.reducer;
