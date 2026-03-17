import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import PopupContainer from "./PopupContainer";

function Map({ points, awards }) {
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
            key={point.restaurant_id}
            center={[point.lat, point.lon]}
            fillOpacity={0.8}
            radius={8}
            fillColor="#F46036"
            color="white"
            weight={1}
          >
            <PopupContainer
              selectedPoint={point}
              filteredAwards={awards.filter(
                (award) => award.restaurant_id === point.restaurant_id,
              )}
            />
          </CircleMarker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;
