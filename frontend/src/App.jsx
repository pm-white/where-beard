import { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [points, setPoints] = useState([]);
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
    let path;
    if (year.length > 0 && category.length > 0) {
      path = `${url}/api/points/${year}/${category.join("|")}`;
    } else if (year.length > 0 && category.length == 0) {
      path = `${url}/api/points/years/${year}`;
    } else if (year.length == 0 && category.length > 0) {
      path = `${url}/api/points/categories/${category.join("|")}`;
    } else {
      path = `${url}/api/points`;
    }
    const response = await fetch(path);
    const data = await response.json();
    setPoints(data);
  };

  useEffect(() => {
    loadCategories();
    loadYears();
    loadPoints();
  }, []);

  useEffect(() => {
    loadPoints(category, year);
  }, [category, year]);

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
        <Map points={points} />
      </div>
    </>
  );
}

export default App;
