import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Assuming you have a loader component

const MainPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay, for example, 2 seconds before the page is ready
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this to simulate the actual loading time
  }, []);

  if (loading) {
    return <Loader />; // Show loader during loading state
  }

  return (
    <div className="main-container">
      <div className="overlay"></div>

      <header className="header">
        <button
          className="header-button"
          onClick={() => navigate("/solarTable")}
        >
          Anomaly Table
        </button>
        <button className="header-button" onClick={() => navigate("/solarMap")}>
          Vulnerability Map
        </button>
        <button className="header-button" onClick={() => navigate("/satellites")}>
          View Vulnerabile Satellites
        </button>
      </header>

      <section className="hero">
        <h1 className="hero-title">Start your research now!</h1>
        <p className="hero-subtitle">
          Welcome to the platform for analyzing solar activity and its impact on
          Earth
        </p>
        <button
          className="header-button"
          onClick={() => navigate("/about")}
          style={{ marginTop: "15px" }}
        >
          About Project
        </button>
      </section>
    </div>
  );
};

export default MainPage;
