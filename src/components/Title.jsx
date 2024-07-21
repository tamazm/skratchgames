import wheelof from "./WheelOfFortune/assets/wheelof.png";
import fortune from "./WheelOfFortune/assets/fortune.png";
import slot from "../assets/slotsmachine/slottitle.png";

function Title({ type, bigger }) {
  return (
    <div
      className="title-texts"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.75rem",
      }}
    >
      {type === "quiz" && (
        <h1 style={{color:'Red',fontSize:'3rem',fontFamily:'cb'}}>Quiz</h1>
      )}
      {type === "ballgame" && (
        <h1 style={{color:'#FEB62A',fontSize:'3rem',fontFamily:'cb'}}>Prize Machine</h1>
      )}
      {type === "form" && (
        <>
          <img style={{ width: "24rem" }} src={wheelof} />
          <img style={{ width: "17.5rem" }} src={fortune} />
        </>
      )}
      {type === "slot" && (
        <>
          <img style={{ width: "24rem" }} src={slot} />
        </>
      )}
      {type === "scratch" && bigger && (
        <h1
          style={{
            userSelect: "none",
            fontSize: "5rem",
            textAlign: "center",
            fontFamily: "Cooper Black Regular",
            color: "#ebd940",
          }}
        >
          {" "}
          Scratch n Win
        </h1>
      )}
      {type === "scratch" && !bigger && (
        <h1
          className="text-6xl md:text-6xl lg:text-7xl text-center mx-auto max-w-sm md:max-w-md lg:max-w-lg"
          style={{
            userSelect: "none",
            fontFamily: "Cooper Black Regular",
            color: "#ebd940",
          }}
        >
          Scratch n Win
        </h1>
      )}
    </div>
  );
}

export default Title;
