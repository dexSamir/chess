import "./Chessboard.css";
import React from "react";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

function Chessboard() {
  const board: React.ReactElement[] = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      board.push(
        <div
          className={`tile ${(i + j) % 2 == 0 ? "black" : "white"}-tile`}
          key={`${horizontalAxis[i]}${verticalAxis[j]}`}
        ></div>
      );
    }
  }

  return <div id="chessboard">{board}</div>;
}
export default Chessboard;
