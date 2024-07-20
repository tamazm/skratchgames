import { useMainContext } from "./MainContext";
import Title from "./Title";
import Wheel from "./Wheel";

function Game() {
  return (
    <div>
      <Title />
      <Wheel buttonContent="SPIN" functional={true} />
    </div>
  );
}

export default Game;
