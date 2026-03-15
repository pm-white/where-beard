import { Popup } from "react-leaflet";
import { useState, useEffect } from "react";

export default function PopupContainer({ restaurant_id, url }) {
  const [name, setName] = useState("");
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respAwards = await fetch(`${url}/api/awards/${restaurant_id}`);
        const dataAwards = await respAwards.json();
        setAwards(dataAwards);

        const respName = await fetch(`${url}/api/name/${restaurant_id}`);
        const dataName = await respName.json();
        setName(dataName["name"]);
      } catch (error) {
        console.error(
          `Error getting data for restaruant with id ${restaurant_id}:`,
          error,
        );
      }
    };

    fetchData();
  }, [restaurant_id, url]);

  return (
    <>
      <Popup>
        <h3>{name}</h3>
        {awards.map((award) => (
          <p key={award.year + award.category}>
            {award.year} | {award.category}
          </p>
        ))}
      </Popup>
    </>
  );
}
