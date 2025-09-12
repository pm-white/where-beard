import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div id="sidebar-container">
        <Sidebar />
      </div>
      <div id="map-container">
        <Map />
      </div>
    </>
  );
}

export default App;
