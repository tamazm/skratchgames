import { useMainContext } from "./MainContext";
import LResult from "../losingResult";
import WResult from "../winningResult";

function Result() {
  const { page, setPage, showConfetti, winning } = useMainContext();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: page === 4 ? "flex" : "none",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {winning && (
        <>
          <WResult
            handlewin={() => {
              window.location.reload();
            }}
          />
        </>
      )}
      {!winning && (
        <>
          <LResult
            handlelose={() => {
              window.location.reload();
            }}
          />
        </>
      )}
    </div>
  );
}

export default Result;
