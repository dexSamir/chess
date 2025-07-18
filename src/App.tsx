import { useState } from "react";
import "./App.css";
import Chessboard from "./components/Chessboard/Chessboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
        <Chessboard />
    </div>
  );
}

export default App;
