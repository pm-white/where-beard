import { useMap } from "react-leaflet";

export default function ResetMap({ points }) {
  function meanCenter(pointsArr) {
    /*
     * Returns the center point of the passed points array, or the
     * center of the entire dataset if points is empty.
     * @param {array} pointsArr - An array of objects with lat and lon properties.
     */
    if (!points || points.length === 0) return [37.82, -94.158];

    const meanLat =
      pointsArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.lat,
        0,
      ) / pointsArr.length;
    const meanLon =
      pointsArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.lon,
        0,
      ) / pointsArr.length;
    return [meanLat, meanLon];
  }

  function getBounds(pointsArr) {
    /*
     * Returns an array of coordinate pairs reprsenting the top left and
     * bottom right corners of the bounding box of the passed points array,
     * or center of the entire dataset if points is empty.
     * @param {array} pointsArr - An array of objects with lat and lon properties.
     */
    if (!points || points.length === 0)
      return {
        topLeftCorner: [61.218, -157.863],
        bottomRightCorner: [17.9842, -66.0362],
      };

    const minLat = Math.min(...pointsArr.map((pt) => pt.lat));
    const maxLat = Math.max(...pointsArr.map((pt) => pt.lat));
    const minLon = Math.min(...pointsArr.map((pt) => pt.lon));
    const maxLon = Math.max(...pointsArr.map((pt) => pt.lon));

    return {
      topLeftCorner: [maxLat, minLon],
      bottomRightCorner: [minLat, maxLon],
    };
  }

  const map = useMap();
  const bounds = getBounds(points);

  map.setView(meanCenter(points));
  map.fitBounds([bounds.topLeftCorner, bounds.bottomRightCorner]);
  return null;
}
