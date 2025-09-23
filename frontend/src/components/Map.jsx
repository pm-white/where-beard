import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

function Map() {
  return (
    <>
      <MapContainer center={[40.76, -73.97]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains={"abcd"}
          maxZoom={20}
        />
      </MapContainer>
    </>
  );
}

export default Map;
