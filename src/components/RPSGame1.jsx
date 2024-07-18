import { useEffect, useState } from "react";
import styles from "./RPSGame1.module.css";
import FistImg from "../assets/rpsgame/fistimg.png";
import HandImg from "../assets/rpsgame/handimg.png";
import ScissorImg from "../assets/rpsgame/sissors.png";
import AiFistHand from "../assets/rpsgame/aihand.png";
import AiPaperhand from "../assets/rpsgame/aipaperhand.png";
import AiScissorhand from "../assets/rpsgame/aisisssorshand.png";
import FistHand from "../assets/rpsgame/hand1.png";
import PaperHand from "../assets/rpsgame/paparhand.png";
import SissorHand from "../assets/rpsgame/sissorhand.png";

const moves = {
  [FistHand]: "rock",
  [PaperHand]: "paper",
  [SissorHand]: "scissors",
  [AiFistHand]: "rock",
  [AiPaperhand]: "paper",
  [AiScissorhand]: "scissors",
};

// const preloadImages = (srcArray) => {
//   const images = {};
//   srcArray.forEach((src) => {
//     const img = new Image();
//     img.src = src;
//     images[src] = img;
//   });
//   return images;
// };

// const imageSources = [FistImg, HandImg, ScissorImg, AiFistHand, AiPaperhand, AiScissorhand, FistHand, PaperHand, SissorHand];

function RPSGame1({ gameOn, view }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  // const [preloadedImages, setPreloadedImages] = useState({});

  const [gameEnded, setGameEnded] = useState(false);

  // useEffect(() => {
  //   setPreloadedImages(preloadImages(imageSources));
  // }, []);

  useEffect(() => {
    if (playerWins === 3 || computerWins === 3) {
      setGameEnded(true);

      setTimeout(() => {
        setFinalResult(true);
      }, 1500);
    }
  }, [playerWins, computerWins]);

  const handlePlayerChoice = (choice) => {

    const choices = [AiFistHand, AiPaperhand, AiScissorhand];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerMove = choices[randomIndex];

    setComputerChoice(computerMove);
    const winner = determineWinner(choice, computerMove);

    setPlayerChoice(choice);
    setResult(winner);

    if (winner === "You Win") {
      setPlayerWins((prev) => prev + 1);
    } else if (winner === "You lose") {
      setComputerWins((prev) => prev + 1);
    }
  };

  const determineWinner = (playerChoice, computerChoice) => {
    const playerMove = moves[playerChoice];
    const computerMove = moves[computerChoice];

    if (winning) {
      if (computerWins === 2) {
        return "You Win";
      }
    }

    if (!winning) {
      if (playerWins === 2) {
        return "You lose";
      }
    }

    if (playerMove === computerMove) {
      return "It's A Tie";
    } else if (
      (playerMove === "rock" && computerMove === "scissors") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissors" && computerMove === "paper")
    ) {
      return "You Win";
    } else {
      return "You lose";
    }
  };

  const handleRotation = (choice) => {

    setIsRotating(true);
    setResult("Waiting...");
    setPlayerChoice(FistHand);
    setComputerChoice(AiFistHand);

    setTimeout(() => {
      setIsRotating(false);
      handlePlayerChoice(choice);
    }, 2000);
  }
  return (
    <div className={styles.main}>
      <div className={styles.RPSgameDiv}>
        <div className={styles.RPSgameLayer1}>
          <div className={styles.HandDiv1}>
            <img
              src={computerChoice || AiFistHand}
              alt="Computer Choice"
              style={{ width: "72.5%", right: "47.5%" }}
              className={`${styles.RPSgameLayer1Img2} ${isRotating ? styles.rotating1 : ""}`}
            />
          </div>
          <div className={styles.resultDiv}>
            <div className={styles.winCounter}>
              {!gameEnded && <h1 className={styles.winsDiv}>{computerWins}</h1>}
              {!gameEnded && <h1 className={styles.winsDiv}>{playerWins}</h1>}

              {gameEnded && (
                <h1 style={{ textAlign: "center" }} className={styles.winsDiv}>
                  {computerWins === 3 && <>YOU LOST!</>}
                  {playerWins === 3 && <>YOU WON!</>}
                </h1>
              )}
            </div>
            <div className={styles.layerDiv}>
              <h1 className={styles.resultText}>{result}</h1>
              <div className={styles.RPSGameLayer2}>
                <img
                  src={FistImg}
                  alt="Fist Image"
                  className={`${styles.Optionimg} ${isRotating ? "disabled" : ""}`}
                  onClick={() => {
                    if (!gameEnded && !isRotating) handleRotation(FistHand);
                  }}
                />
                <img
                  src={HandImg}
                  alt="Hand Image"
                  className={`${styles.Optionimg} ${isRotating ? "disabled" : ""}`}
                  onClick={() => {
                    if (!gameEnded && !isRotating) handleRotation(PaperHand);
                  }}
                />
                <img
                  src={ScissorImg}
                  alt="Scissor Image"
                  className={`${styles.Optionimg} ${isRotating ? "disabled" : ""}`}
                  onClick={() => {
                    if (!gameEnded && !isRotating) handleRotation(SissorHand);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.HandDiv2}>
            <img
              src={playerChoice || FistHand}
              alt="Player Choice"
              style={{ width: "72.5%", left: "47.5%" }}
              className={`${styles.RPSgameLayer1Img1} ${isRotating ? styles.rotating : ""}}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RPSGame1;
