import { Popup } from "react-leaflet";

export default function PopupContainer({ selectedPoint, filteredAwards }) {
  return (
    <>
      <Popup>
        <h3>{selectedPoint.name}</h3>
        {filteredAwards.map((award) => (
          <p key={award.year + award.category}>
            {award.year} | {award.category}
          </p>
        ))}
      </Popup>
    </>
  );
}
