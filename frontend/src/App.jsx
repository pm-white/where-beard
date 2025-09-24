import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [points, setPoints] = useState([]);
  const [category, setCategory] = useState("");

  const loadCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  const loadYears = async () => {
    const response = await fetch("/api/years");
    const data = await response.json();
    setYears(data);
  };

  // TODO: allow multiple select on category and year
  const loadPoints = async () => {
    let response;
    if (category === "") {
      response = await fetch(`/api/points`);
    } else {
      response = await fetch(`/api/points/${category}`);
    }
    const data = await response.json();
    setPoints(data);
  };

  useEffect(() => {
    loadCategories();
    loadYears();
    loadPoints();
  }, []);

  useEffect(() => {
    loadPoints(category);
  }, [category]);

  return (
    <>
      <div id="sidebar-container">
        <Sidebar
          categories={categories}
          years={years}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div id="map-container">
        <Map points={points} />
      </div>
    </>
  );
}

export default App;
