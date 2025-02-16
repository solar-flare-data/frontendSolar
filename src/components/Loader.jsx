import React from "react";

const Loader = () => {
  return (
    <div className="bg-loader">
      <div className="hex-border">
        <div className="hexagons">
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
          <div className="hexagon"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
