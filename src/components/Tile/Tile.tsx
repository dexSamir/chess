import "./Tile.css";

interface TileProps {
  number: number;
  image?: string; 
}

function Tile({ number, image }: TileProps) {
  return (
    <div className={`tile ${number % 2 === 0 ? "black" : "white"}-tile`}>
       {image && <div style={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
    </div>
  );
}

export default Tile;
