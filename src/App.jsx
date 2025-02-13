import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolarData } from "./store/actions/solarData.action";
import { detectAnomalies } from "./store/slices/solarData.slice";

const App = () => {
  const dispatch = useDispatch();
  const {
    data,
    anomalies = [],
    loading,
    error,
  } = useSelector((state) => state.solarData);

  useEffect(() => {
    dispatch(fetchSolarData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(detectAnomalies());
    }
  }, [data, dispatch]);

  return (
    <div className="container">
      <h1 className="heading">Solar Flare Data</h1>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="tableContainer">
        <h2 className="tableHeading">All Flares:</h2>
        <table className="table">
          <thead>
            <tr className="tableHeaderRow">
              <th className="tableHeader">ID</th>
              <th className="tableHeader">Class Type</th>
              <th className="tableHeader">Peak Time</th>
              <th className="tableHeader">Start Time</th>
              <th className="tableHeader">End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((flare, index) => (
              <tr key={index} className="tableRow">
                <td className="tableData">{flare.flrID}</td>
                <td className="tableData">{flare.classType}</td>
                <td className="tableData">{flare.peakTime}</td>
                <td className="tableData">{flare.beginTime}</td>
                <td className="tableData">{flare.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tableContainer">
        <h2 className="tableHeading">Anomalies Detected:</h2>
        <table className="table">
          <thead>
            <tr className="tableHeaderRow">
              <th className="tableHeader">ID</th>
              <th className="tableHeader">Class Type</th>
              <th className="tableHeader">Peak Time</th>
              <th className="tableHeader">Start Time</th>
              <th className="tableHeader">End Time</th>
            </tr>
          </thead>
          <tbody>
            {anomalies.length > 0 ? (
              anomalies.map((flare, index) => (
                <tr key={index} className="anomalyRow">
                  <td className="tableData">{flare.flrID}</td>
                  <td className="tableData">{flare.classType}</td>
                  <td className="tableData">{flare.peakTime}</td>
                  <td className="tableData">{flare.beginTime}</td>
                  <td className="tableData">{flare.endTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="noData">
                  No anomalies detected
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
