import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pawn_b.png",
    x: i,
    y: 6,
  });
}

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 1,
    y,
  });
  initialBoardState.push({
    image: `assets/images/knight_${type}.png`,
    x: 6,
    y,
  });
  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 2,
    y,
  });
  initialBoardState.push({
    image: `assets/images/bishop_${type}.png`,
    x: 5,
    y,
  });
  initialBoardState.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
  initialBoardState.push({ image: `assets/images/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "assets/images/pawn_w.png",
    x: i,
    y: 1,
  });
}

function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboarRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboarRef.current;
    const element = e.target as HTMLElement;

    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboarRef.current;

    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;

      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      if (x < minX) activePiece.style.left = `${minX}px`;
      else if (x > maxX) activePiece.style.left = `${maxX}px`;
      else activePiece.style.left = `${x}px`;

      if (y < minY) activePiece.style.top = `${minY}px`;
      else if (x > maxY) activePiece.style.top = `${maxY}px`;
      else activePiece.style.top = `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboarRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null); 
    }
  }

  const board: React.ReactElement[] = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      let img;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          img = p.image;
        }
      });

      board.push(<Tile number={i + j} image={img} key={`${j},${i}`} />);
    }
  }

  return (
    <div
      onMouseUp={(e) => dropPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      id="chessboard"
      ref={chessboarRef}
    >
      {board}
    </div>
  );
}
export default Chessboard;
