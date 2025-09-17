import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

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

  useEffect(() => {
    loadCategories();
    loadYears();
  }, []);

  return (
    <>
      <div id="sidebar-container">
        <Sidebar categories={categories} years={years} />
      </div>
      <div id="map-container">
        <Map />
      </div>
    </>
  );
}

export default App;
