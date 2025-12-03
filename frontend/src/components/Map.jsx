import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";

function Map({ points }) {
  return (
    <>
      <MapContainer center={[40.76, -73.97]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains={"abcd"}
          maxZoom={20}
        />
        {points.map((point) => (
          <CircleMarker
            center={[point.lat, point.lon]}
            fillOpacity={0.8}
            radius={8}
            fillColor="#F46036"
            color="white"
            weight={1}
          >
            <Popup>
              <h3>{point.name}</h3>
              <p>
                {point.year} | {point.category}
              </p>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;
