import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <section className="hero">
        <h1 className="hero-title">Find Danger Zones</h1>
        <p className="hero-subtitle">
          Analyze solar flares and their impact on Earth with our monitoring
          system.
        </p>
        <button className="hero-button" onClick={() => navigate("/map")}>
          Explore the Map
        </button>
      </section>

      <section className="buttons-container">
        <button
          className="action-button"
          onClick={() => navigate("/solarTable")}
        >
          📊 View Anomaly Table
        </button>
        <button className="action-button" onClick={() => navigate("/solarMap")}>
          🌍 View Vulnerability Map
        </button>
      </section>
    </div>
  );
};

export default MainPage;
