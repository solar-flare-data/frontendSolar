// satelliteUtils.js
import { Math } from "mathjs"; // Для работы с углами и тригонометрическими функциями

export const calculatePosition = (satellite, time) => {
  const {
    inclination,
    raan,
    eccentricity,
    arg_perigee,
    mean_anomaly,
  } = satellite;

  const inclinationRad = Math.radians(inclination);
  const raanRad = Math.radians(raan);
  const argPerigeeRad = Math.radians(arg_perigee);
  const meanAnomalyRad = Math.radians(mean_anomaly);

  let E = meanAnomalyRad; // Начальная эксцентричная аномалия
  let deltaE = 1;
  while (Math.abs(deltaE) > 1e-6) {
    deltaE =
      (meanAnomalyRad - (E - eccentricity * Math.sin(E))) /
      (1 - eccentricity * Math.cos(E));
    E += deltaE;
  }

  const radius = 1 - eccentricity * Math.cos(E);
  const trueAnomaly =
    2 *
    Math.atan(
      Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(E / 2)
    );

  const x0 =
    radius *
    (Math.cos(raanRad) * Math.cos(trueAnomaly + argPerigeeRad) -
      Math.sin(raanRad) *
        Math.sin(trueAnomaly + argPerigeeRad) *
        Math.cos(inclinationRad));
  const y0 =
    radius *
    (Math.sin(raanRad) * Math.cos(trueAnomaly + argPerigeeRad) +
      Math.cos(raanRad) *
        Math.sin(trueAnomaly + argPerigeeRad) *
        Math.cos(inclinationRad));
  const z0 =
    radius * (Math.sin(trueAnomaly + argPerigeeRad) * Math.sin(inclinationRad));

  return {
    x: x0,
    y: y0,
    z: z0,
  };
};
