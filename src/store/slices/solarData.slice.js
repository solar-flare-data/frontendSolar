import { createSlice } from "@reduxjs/toolkit";
import { fetchSolarData } from "../actions/solarData.action";

const initialState = {
  data: [],
  anomalies: [],
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

export const { detectAnomalies } = solarDataSlice.actions;
export default solarDataSlice.reducer;
