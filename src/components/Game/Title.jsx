import wheelof from "./assets/wheelof.png";
import fortune from "./assets/fortune.png";

function Title() {
  return (
    <div className="title-texts" style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}>
      <img style={{ width: "24rem"}} src={wheelof} />
      <img style={{ width: "17.5rem"}} src={fortune} />

      {/* <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>WHEEL OF</h1> */}
      {/* <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>FORTUNE </h1> */}
    </div>
  );
}

export default Title;
