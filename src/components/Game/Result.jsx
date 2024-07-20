import { useMainContext } from "./MainContext";
import LResult from "../losingResult";

function Result() {
  const { setPage, showConfetti } = useMainContext();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <LResult
        handlelose={() => {
          showConfetti(false);
          setPage(1);
        }}
      />
    </div>
  );
}

export default Result;
