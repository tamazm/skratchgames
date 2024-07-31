import { useMainContext } from "./MainContext";
import LResult from "../losingResult";
import WResult from "../winningResult";

import { motion } from "framer-motion";

import "./Result.css"
import PrintCanvas from "../../assets/printomato/PrintCanvas.png";

function Result() {
  const { page } = useMainContext();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: page === 4 ? "flex" : "none",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className="printomatomobile"
    >
      <img src={PrintCanvas} style={{ position: "absolute" }} />

      <div
        style={{
          position: "relative",
          width: "15rem",
          bottom: "3.5rem",
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", fontWeight: "900" }}>Thanks for playing!</h1>
        <p style={{ fontSize: "1rem" }}>Get ready to celebrate!</p>
        <p style={{ fontSize: "0.8rem", padding: "0rem 1rem 0rem 1rem", marginTop: "1.5rem" }}>
          As this is only a demo there are no prizes anyway, so you haven't actually lost out. If you like the idea of gamified
          incentives for your prospects, customers or teams, we're ready to help you set it up.
        </p>
        <motion.button
          onClick={() => window.location.reload()}
          whileTap={{ scale: 0.85 }}
          style={{
            background: "linear-gradient(to right, #e27274, #e27274)",
            borderRadius: "12px",
            fontSize: "0.9rem",
            padding: "0.5rem 1.5rem",
            marginTop: "2rem",
            color: "#fff",
          }}
        >
          Finish
        </motion.button>
      </div>
    </div>
  );
}

export default Result;
