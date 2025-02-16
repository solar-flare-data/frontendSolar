import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

const calculatePosition = (satellite) => {
  const { x, y, z } = satellite; // Use orbital coordinates
  const lat = x; // Real position calculation logic
  const lon = y;
  const altitude = z;

  return { lat, lon, altitude };
};

const calculateDistance = (satelliteLocation, flareLocation) => {
  const lat1 = satelliteLocation.lat;
  const lon1 = satelliteLocation.lon;
  const lat2 = flareLocation.lat;
  const lon2 = flareLocation.lon;

  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const SatelliteMap = ({ satellites }) => {
  const [satellitePositions, setSatellitePositions] = useState([]);
  const { analyzedData = [] } = useSelector((state) => state.solarData);

  useEffect(() => {
    const positions = satellites.map((satellite) => {
      const { lat, lon } = calculatePosition(satellite);
      return { lat, lon, name: satellite.name };
    });
    setSatellitePositions(positions);
  }, [satellites]);

  const dangerFlareLocations = analyzedData
    .filter((flare) => flare.dangerLevel >= 80)
    .map((flare) => ({
      name: flare.name,
      location: flare.sourceLocation
        ? convertSolarToEarthCoords(flare.sourceLocation)
        : null,
      dangerLevel: flare.dangerLevel,
    }))
    .filter((flare) => flare.location); // Remove invalid locations

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {satellitePositions.map((position, index) => {
        const isInDangerZone = dangerFlareLocations.some((flare) => {
          const flareLocation = flare.location;
          const distance = calculateDistance(position, flareLocation);
          return distance < 5000; // Check if the satellite is within 5000 km of the flare
        });

        return (
          <Marker
            position={[position.lat, position.lon]}
            key={index}
            icon={
              new L.Icon({
                iconUrl: isInDangerZone
                  ? "/path/to/red-icon.png"
                  : "/path/to/green-icon.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          >
            <Popup>
              {position.name} {isInDangerZone ? "(In Danger)" : "(Safe)"}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default SatelliteMap;

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
