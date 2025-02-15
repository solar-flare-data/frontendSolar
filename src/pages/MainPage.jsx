import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

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
          style={{marginTop: "15px"}}
        >
          About Project
        </button>
      </section>
    </div>
  );
};

export default MainPage;
