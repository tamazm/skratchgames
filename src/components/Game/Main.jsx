import React, { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import Result from "./Result";
import Game from "./Game";
import Form from "../Form/Form";
import { MainProvider, useMainContext } from "./MainContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./Main.css";

import background from "./assets/background.png";
import Loader from "../Loader/Loader";

function Main() {
  const { confetti, loading, setLoading } = useMainContext();

  useEffect(() => {
    const images = Array.from(document.getElementById("main").getElementsByTagName("img"));

    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.src;

        loadImg.onload = () => resolve(image.src);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(images.map((image) => loadImage(image)))
      .then(() => setLoading(false))
      .catch((err) => console.log("Failed to load images", err));
  }, [setLoading]);

  return (
    <div
      style={
        loading
          ? {
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              background: `url(${background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.5, delay: 2 }}
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        >
          <Loader />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `url(${background})`,
          opacity: loading ? 0 : "1",
          position: "relative",
        }}
        id="main"
        className="main"
      >
        <StartScreen />
        <Form />
        <Game />
        <Result />

        {confetti && <Confetti style={{ zIndex: "9999999" }} />}
      </motion.div>
    </div>
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
