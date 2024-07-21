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
              showConfetti(false);
              setPage(1);
              window.location.reload()
            }}
          />
        </>
      )}
      {!winning && (
        <>
          <LResult
            handlelose={() => {
              showConfetti(false);
              setPage(1);
              window.location.reload()
            }}
          />
        </>
      )}
    </div>
  );
}

export default Result;
