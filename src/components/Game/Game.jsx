import { useMainContext } from "./MainContext";
import Title from "./Title";
import Wheel from "./Wheel";

import { motion } from "framer-motion";

function Game() {
  const { page, setPage } = useMainContext();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75 }}
      className="container"
    >
      <Title />

      <Wheel buttonContent="SPIN" functional={true} />
    </motion.div>
  );
}

export default Game;
