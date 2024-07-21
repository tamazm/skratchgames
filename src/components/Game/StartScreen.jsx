import { useMainContext } from "./MainContext";
import Title from "./Title";
import Wheel from "./Wheel";

function StartScreen() {
  const { page, setPage } = useMainContext();

  return (
    <div style={{ display: page === 1 ? "flex" : "none" }} className="container">
      <div>
        <Title />

        <h6 className="info" style={{ color: "#FFECB2", textAlign: "center", margin: "0 auto", marginTop: "2rem", fontWeight: "500" }}>
          Here at Skratchville we help organizations like yours generate new leads, create innovative customer and staff incentives,
          all whilst saving both time and money!
        </h6>
      </div>

      <Wheel buttonOnClick={() => setPage(2)} functional={false} />
    </div>
  );
}

export default StartScreen;
