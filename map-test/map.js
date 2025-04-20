async function getGeoJSON(path) {
  const file = "../data/2025_semifinalists.json";
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // empty features array for the geoJSON
    let features = [];

    // build out each feature object and add to features
    data.forEach((r) => {
      const obj = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [r.lon, r.lat],
        },
        properties: {
          restaurant: r.restaurant,
        },
      };
      features.push(obj);
    });

    // create and return geoJSON object
    let geojson = {
      type: "FeatureCollection",
      features: features,
    };

    return geojson;
  } catch (error) {
    console.error(error.message);
  }
}

const data = await getGeoJSON("../data/2025_semifinalists.json");
console.log("GeoJSON:", data);

let map = L.map("map").setView([42.34, -71.05], 10);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  },
).addTo(map);
