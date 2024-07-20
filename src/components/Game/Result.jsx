import { useMainContext } from "./MainContext";
import LResult from "../losingResult";

function Result() {
  const { setPage, showConfetti } = useMainContext();

  return (
    <LResult
      handlelose={() => {
        showConfetti(false);
        setPage(1);
      }}
    />
  );
}

export default Result;
