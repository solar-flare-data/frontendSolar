import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSolarData } from "../store/actions/solarData.action";
import { analyzeFlares } from "../store/slices/solarData.slice";
import Loader from "../components/Loader";

const SolarActiveTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (data && data.length > 0) {
      dispatch(analyzeFlares());
    }
  }, [data, dispatch]);

  if (loading) {
    return <Loader />; // Show loading message if data is being fetched
  }

  if (error) {
    return <p className="error">Error: {error}</p>; // Show error message if there's an issue fetching data
  }

  const hasData = analyzedData && analyzedData.length > 0;

  return (
    <div className="solar-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1 className="heading">Solar Flare Data</h1>

      <div className="tableContainer">
        <h2 className="tableHeading">All Flares:</h2>
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr className="tableHeaderRow">
                <th>ID</th>
                <th>Class Type</th>
                <th>Peak Time</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Reason</th>
                <th>Consequences</th>
                <th>Danger Level</th>
              </tr>
            </thead>
            <tbody>
              {hasData ? (
                analyzedData.map((flare, index) => (
                  <tr
                    key={index}
                    className={flare.dangerLevel >= 80 ? "highDanger" : ""}
                  >
                    <td>{flare.flrID}</td>
                    <td>{flare.classType}</td>
                    <td>{flare.peakTime}</td>
                    <td>{flare.beginTime}</td>
                    <td>{flare.endTime}</td>
                    <td>{flare.reason || "Not Available"}</td>
                    <td>{flare.consequences || "Not Available"}</td>
                    <td>{flare.dangerLevel || "Unknown"}</td>
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
