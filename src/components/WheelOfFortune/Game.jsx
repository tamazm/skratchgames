import { useMainContext } from "./MainContext";
import Title from "../Title";
import Wheel from "./Wheel";

function Game() {
  const { page } = useMainContext();

  return (
    <div style={{ display: page === 3 ? "flex" : "none" }} className="container">
      <Title type="form" />
      <Wheel buttonContent="SPIN" functional={true} />
    </div>
  );
}

export default Game;
