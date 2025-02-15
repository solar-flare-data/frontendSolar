import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolarData } from "../store/actions/solarData.action";
import { analyzeFlares } from "../store/slices/solarData.slice";

const SolarActiveTable = () => {
  const dispatch = useDispatch();
  const {
    data,
    analyzedData = [],
    loading,
    error,
  } = useSelector((state) => state.solarData);

  useEffect(() => {
    dispatch(fetchSolarData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(analyzeFlares());
    }
  }, [data, dispatch]);

  return (
    <div className="container">
      <h1 className="heading">Solar Flare Data</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="tableContainer">
        <h2 className="tableHeading">All Flares:</h2>
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr className="tableHeaderRow">
                <th className="tableHeader">ID</th>
                <th className="tableHeader">Class Type</th>
                <th className="tableHeader">Peak Time</th>
                <th className="tableHeader">Start Time</th>
                <th className="tableHeader">End Time</th>
                <th className="tableHeader">Reason</th>
                <th className="tableHeader">Consequences</th>
                <th className="tableHeader">Danger Level</th>
              </tr>
            </thead>
            <tbody>
              {analyzedData.length > 0 ? (
                analyzedData.map((flare, index) => (
                  <tr
                    key={index}
                    className={`tableRow ${
                      flare.dangerLevel >= 80 ? "highDanger" : ""
                    }`}
                  >
                    <td className="tableData">{flare.flrID}</td>
                    <td className="tableData">{flare.classType}</td>
                    <td className="tableData">{flare.peakTime}</td>
                    <td className="tableData">{flare.beginTime}</td>
                    <td className="tableData">{flare.endTime}</td>
                    <td className="tableData">
                      {flare.reason || "Not Available"}
                    </td>
                    <td className="tableData">
                      {flare.consequences || "Not Available"}
                    </td>
                    <td className="tableData">
                      {flare.dangerLevel || "Unknown"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="noData">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolarActiveTable;
