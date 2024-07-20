import { useMainContext } from "./MainContext";
import Wheel from "./Wheel";

function StartScreen() {
  const { page, setPage } = useMainContext();

  return (
    <div className="container">
      <div>
        <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>WHEEL OF</h1>
        <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>FORTUNE </h1>

        <h6 className="info" style={{ color: "gold", textAlign: "center", margin: "0 auto" }}>
          Here at Skratchville we help organizations like yours generate new leads, create innovative customer and staff incentives,
          all whilst saving both time and money!
        </h6>
      </div>

      <Wheel buttonOnClick={() => setPage(2)} functional={false} />
    </div>
  );
}

export default StartScreen;
