import mockup from "./assets/mockup.png";
import { motion } from "framer-motion";
import { useMainContext } from "./MainContext";

function StartScreen() {
  const { page, setPage } = useMainContext();

  return (
    <div style={{ position: "relative", bottom: "0.5rem", display: page === 1 ? "flex" : "none", minHeight: "95vh", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1 style={{ fontFamily: "bs", fontSize: "3.25rem" }}>Printomato</h1>

        <h2 style={{ fontFamily: "bs", fontSize: "1.5rem" }}>Picture. Perfect. Promotions.</h2>
      </div>

      <img style={{ width: "22.5rem" }} src={mockup} />

      <motion.button
        onClick={() => setPage(2)}
        whileTap={{ scale: 0.85 }}
        style={{
          fontFamily: "bs",
          fontSize: "0.9rem",
          padding: "0.75rem 1.25rem",
          borderRadius: "12px",
          background: "linear-gradient(to right, #b56835, #bf8054)",
          color: "#fff",
        }}
      >
        ENTER NOW
      </motion.button>
    </div>
  );
}

export default StartScreen;
