/**
 * Geospatial Utilities for Red Sea Monitor
 * Handles coordinate blurring for sensitive wildlife and coordinate formatting.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Generalizes coordinates to ~11km grid centroid (0.1 degree precision)
 * Protects endangered species (dugongs, marine turtles, shark aggregations)
 * from targeted poaching or habitat disturbance.
 */
export function blurCoordinates(lat: number, lng: number): Coordinates {
  const step = 0.1;
  const blurredLat = Math.floor(lat / step) * step + step / 2;
  const blurredLng = Math.floor(lng / step) * step + step / 2;
  return {
    lat: Number(blurredLat.toFixed(4)),
    lng: Number(blurredLng.toFixed(4)),
  };
}

/**
 * Converts decimal degrees to archival field-journal DMS notation
 * e.g., 27.25, 33.81 -> "27°15′N 33°49′E"
 */
export function formatCoordinatesDMS(lat: number, lng: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';

  const absLat = Math.abs(lat);
  const absLng = Math.abs(lng);

  const latDeg = Math.floor(absLat);
  const latMin = Math.round((absLat - latDeg) * 60);

  const lngDeg = Math.floor(absLng);
  const lngMin = Math.round((absLng - lngDeg) * 60);

  return `${latDeg}°${latMin.toString().padStart(2, '0')}′${latDir} ${lngDeg}°${lngMin.toString().padStart(2, '0')}′${lngDir}`;
}
