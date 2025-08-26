import "./App.css";
import Greeting from "./components/Greeting";

function App() {
  let pName = "Phil";
  return (
    <>
      <Greeting name={pName} />
    </>
  );
}

export default App;
