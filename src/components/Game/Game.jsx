import { useMainContext } from "./MainContext";
import Wheel from "./Wheel";

function Game() {
  const { page, setPage } = useMainContext();

  return (
    <div className="container">
      <div>
        <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>WHEEL OF</h1>
        <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>FORTUNE </h1>
      </div>

      <Wheel buttonContent="SPIN" functional={true} />
    </div>
  );
}

export default Game;
