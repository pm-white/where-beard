import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [points, setPoints] = useState([]);
  const [awards, setAwards] = useState([]);
  const [category, setCategory] = useState([]);
  const [year, setYear] = useState([]);

  const url = import.meta.env.PROD ? import.meta.env.VITE_PROD_BACKEND_URL : "";

  const loadCategories = async () => {
    const response = await fetch(`${url}/api/categories`);
    const data = await response.json();
    setCategories(data);
  };

  const loadYears = async () => {
    const response = await fetch(`${url}/api/years`);
    const data = await response.json();
    setYears(data);
  };

  const loadPoints = async () => {
    const response = await fetch(`${url}/api/points`);
    const data = await response.json();
    setPoints(data.restaurants);
    setAwards(data.awards);
  };

  useEffect(() => {
    loadCategories();
    loadYears();
    loadPoints();
  }, []);

  function filterPoints() {
    const rest_ids = new Set();

    const numYrs = year.length;
    const numCats = category.length;
    if (numYrs > 0 && numCats === 0) {
      awards.forEach((award) => {
        if (year.includes(award.year)) {
          rest_ids.add(award.restaurant_id);
        }
      });
    } else if (numYrs === 0 && numCats > 0) {
      awards.forEach((award) => {
        if (category.includes(award.category)) {
          rest_ids.add(award.restaurant_id);
        }
      });
    } else if (numYrs > 0 && numCats > 0) {
      awards.forEach((award) => {
        if (year.includes(award.year) && category.includes(award.category)) {
          rest_ids.add(award.restaurant_id);
        }
      });
    } else {
      return points;
    }

    return points.filter((pt) => rest_ids.has(pt.restaurant_id));
  }

  return (
    <>
      <div id="sidebar-container">
        <Sidebar
          years={years}
          year={year}
          setYear={setYear}
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div id="map-container">
        <Map points={filterPoints()} awards={awards} />
      </div>
    </>
  );
}

export default App;
