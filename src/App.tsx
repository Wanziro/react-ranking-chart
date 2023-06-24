import { useState } from "react";
import "./App.css";
import movieData from "./data/movies.json";

function App() {
  const [data, setData] = useState(movieData);
  return <div></div>;
}

export default App;
