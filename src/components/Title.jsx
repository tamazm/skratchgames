import wheelof from "./WheelOfFortune/assets/wheelof.png";
import fortune from "./WheelOfFortune/assets/fortune.png";

function Title({ type }) {
  return (
    <div
      className="title-texts"
      style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}
    >
      {type === "form" && (
        <>
          <img style={{ width: "24rem" }} src={wheelof} />
          <img style={{ width: "17.5rem" }} src={fortune} />
        </>
      )}

    </div>
  );
}

export default Title;
