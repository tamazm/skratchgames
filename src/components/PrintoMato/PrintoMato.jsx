import React, { useEffect, useState } from "react";
import styles from "./PrintoMato.module.css";
import GameCanvas from "../../assets/printomato/GameCanvas.png";
import GameBtn from "../../assets/printomato/GameBtn.png";
import Item1 from "../../assets/printomato/item (1).png";
import Item2 from "../../assets/printomato/item (2).png";
import Item3 from "../../assets/printomato/item (3).png";
// import PrintBar from "../../assets/printomato/printBar.png";
import PrintCanvas from "../../assets/printomato/PrintCanvas.png";
import { useMainContext } from "../PrintoMatoCont/MainContext";
const images = [Item1, Item2, Item3];

import { motion } from "framer-motion";

function PrintoMato() {
  const { loading, page, setPage, showConfetti } = useMainContext();

  const [started, setStarted] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [result, setResult] = useState(false);
  const [printResult, setPrintResult] = useState(false);
  const [finalImg, setFinalImg] = useState(null);
  const handleFinal = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setFinalImg(images[randomIndex]);
  };
  const handleGame = () => {
    setResult(false);
    setGameOn(true);
    setStarted(true)
    setTimeout(() => {
      setGameOn(false);
      setResult(true);
      handleFinal();
      setTimeout(() => {
        setPrintResult(true);
      }, 2500);
    }, 2500);
  };

  useEffect(() => {
    if (printResult) {
      setTimeout(() => {
        showConfetti(true)
        setPage(4);
      }, 3500);
    }
  }, [printResult]);

  return (
    <motion.div
      style={page === 3 ? { position: "relative", display: "flex", flexDirection: "column", gap: "0.5rem" } : { display: "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className={styles.main}
    >
      <h1 style={{ fontFamily: "bs", fontSize: "3.25rem" }}>Printomato</h1>

      <div className={styles.GameDiv}>
        <div className={styles.GameCanvasWrapper}>
          <img
            style={{
              background: "radial-gradient(circle, #404042 75%, #fff)",
            }}
            src={GameCanvas}
            className={styles.GameCanvas}
          />
        </div>
        <motion.img
          whileTap={{ scale: started ? 1 : 0.85 }}
          src={GameBtn}
          style={{ cursor: started ? "default" : "pointer" }}
          className={styles.GameBtn}
          onClick={() => {
            started ? "" : handleGame();
          }}
        />
        <div className={styles.SliderDiv}>
          <div className={styles.AdSlider}>
            <p style={{ background: "#a60700", whiteSpace: "nowrap", fontSize: "0.4rem", color: "#fff" }} className={styles.AdAnimation}>
              Sponsored By Coa-Cola Sponsored By Coa-Cola Sponsored By Coa-Cola Sponsored By Coa-Cola
            </p>
          </div>
          <div className={`${styles.SliderCont} ${gameOn ? styles.SliderAnimation : ""}`}>
            <img src={Item1} className={styles.Item} />
            <img src={Item2} className={styles.Item} />
            <img src={Item3} className={styles.Item} />
            <img src={Item1} className={styles.Item} />
            <img src={Item2} className={styles.Item} />
            <img src={Item3} className={styles.Item} />
            <img src={Item1} className={styles.Item} />
            <img src={Item2} className={styles.Item} />
            <img src={Item3} className={styles.Item} />
            <img src={Item3} className={styles.Item} />
          </div>
          {result && (
            <div style={{ backgroundColor: "#404042", zIndex: "999" }}>
              <img src={finalImg} className={styles.Item} />
            </div>
          )}
        </div>
        <div className={styles.printDiv}>
          {/* <img src={PrintBar} /> */}
          {printResult && (
            <div className={`${styles.ResultPrintDiv} ${printResult ? styles.PrintAnimation : ""}`}>
              <img src={PrintCanvas} className={styles.PrintCanvas} />
              <img src={finalImg} className={styles.PrintImg} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default PrintoMato;
