import "./Tile.css";

interface TileProps {
  number: number;
  image?: string; 
}

function Tile({ number, image }: TileProps) {
  return (
    <div className={`tile ${number % 2 === 0 ? "black" : "white"}-tile`}>
        <img src={image}  className="chess-piece"/>
    </div>
  );
}

export default Tile;
