import React, { useEffect } from "react";
import StartScreen from "./StartScreen";
import { MainProvider, useMainContext } from "./MainContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Game from "./Game";
import Result from "./Result";

import background from "./assets/background.png";

import Form from "../Form/Form";

function Main() {
  const { page, setPage, confetti, loading, setLoading } = useMainContext();

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
              background: "#181818",
              // background: `url(${background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
          : {}
      }
    >
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
        {page === 2 && (
          <Form
            type="scratch"
            gradient="linear-gradient(to right, #64a8e1, #0473cf)"
            accentColor="#348ed7"
            preview={background}
            setPage={setPage}
          />
        )}
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
