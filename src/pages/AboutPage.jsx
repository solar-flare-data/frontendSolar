import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader"; // Assuming you have a loader component

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., waiting for data to load)
    setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false
    }, 2000); // Adjust this timeout to fit your actual data loading time
  }, []);

  if (loading) {
    return <Loader />; // Show loader during loading state
  }

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About the Project</h1>
      </header>
      <Link to="/" className="back-button">
        ⬅ Back
      </Link>

      <section className="about-intro">
        <h2>Solar Activity & Vulnerability Analysis</h2>
        <p>
          This platform is designed to analyze solar activity, track anomalies,
          and assess vulnerable zones on Earth. It provides insights into the
          impact of solar flares, geomagnetic storms, and other space weather
          phenomena.
        </p>
      </section>

      <section className="about-features">
        <h2>Key Features</h2>
        <ul>
          <li>
            ✅ <strong>Solar Flare Analysis</strong> - Track and assess solar
            eruptions and their effects.
          </li>
          <li>
            ✅ <strong>Vulnerability Map</strong> - Visualize areas affected by
            solar activity and geomagnetic storms.
          </li>
          <li>
            ✅ <strong>Anomaly Table</strong> - Explore historical data and
            space weather patterns.
          </li>
          <li>
            ✅ <strong>Satellite Monitoring</strong> - Stay updated on satellite
            conditions and hazards.
          </li>
        </ul>
      </section>

      <section className="about-importance">
        <h2>Why It Matters?</h2>
        <p>
          Solar activity can disrupt communication systems, GPS navigation,
          satellites, and even power grids. This project helps researchers and
          engineers understand and predict such risks, contributing to better
          preparedness for space weather events.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
