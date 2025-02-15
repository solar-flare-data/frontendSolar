import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAffectedAreas } from "../store/slices/solarData.slice";
import { fetchSolarData } from "../store/actions/solarData.action";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const SolarMap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const affectedAreas = useSelector((state) => state.solarData.affectedAreas);

  useEffect(() => {
    dispatch(fetchSolarData()).then(() => {
      dispatch(updateAffectedAreas());
    });
  }, [dispatch]);

  return (
    <div className="map">
      <h2 style={{ margin: "20px" }}>Vulnerabile Zones</h2>

      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "900px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a> | NASA, USGS'
        />

        {affectedAreas.map((area, index) => (
          <Marker key={index} position={[area.lat, area.lon]} icon={redIcon}>
            <Popup>
              ⚠ Опасная зона <br /> Ш: {area.lat}, Д: {area.lon}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SolarMap;
