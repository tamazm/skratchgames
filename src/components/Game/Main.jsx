import StartScreen from "./StartScreen";
import Result from "./Result";
import Game from "./Game";
import Form from "../Form/Form";
import { MainProvider, useMainContext } from "./MainContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./Main.css";

function Main() {
  const { page, confetti } = useMainContext();

  return (
    <motion.div className="main">
      {page === 1 && <StartScreen />}
      {page === 2 && <Form />}
      {page === 3 && <Game />}
      {page === 4 && <Result />}

      {confetti && <Confetti style={{ zIndex: "9999999" }} />}
    </motion.div>
  );
}

function Wrapper() {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
}

export default Wrapper;
