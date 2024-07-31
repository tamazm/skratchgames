import React, { useEffect } from "react";
import StartScreen from "./StartScreen";
import Result from "./Result";
import Game from "../PrintoMato";
import Form from "../Form/Form";
import { MainProvider, useMainContext } from "./MainContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./Main.css";

import preview from "./assets/mockup.png";
// import background from "./assets/background.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
    <HelmetProvider>
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
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : {
                background: "#fff",
              }
        }
      >
        <Helmet>
          <title>Skratchville Games - Printomato</title>
          <meta property="og:image" content={preview} />
          <meta property="og:title" content="Skratchville Games - Printomato" />
          <meta property="og:description" content="Printomato" />
          <meta property="og:url" content="https://skratchville.com" />
        </Helmet>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            // background: `url(${background})`,
            opacity: loading ? 0 : "1",
            position: "relative",
          }}
          id="main"
          className="main"
        >
          <StartScreen />
          {page === 2 && <Form type="printomato" accentColor="#bf8054" gradient="linear-gradient(to right, #b56835, #bf8054)" preview={preview} setPage={setPage} />}
          <Game />
          <Result />

          {confetti && <Confetti style={{ zIndex: "9999999" }} />}
        </motion.div>
      </div>
    </HelmetProvider>
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
