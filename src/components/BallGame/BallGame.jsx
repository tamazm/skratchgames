import { useEffect, useState } from "react";
import styles from "./BallGame.module.css";
import gameI from "../../assets/ballgame/gamei.png";
import switch1 from "../../assets/ballgame/switch.png";
import glass1 from "../../assets/ballgame/glass.png";
import Ball1 from "../../assets/ballgame/ball (1).png";
import Ball2 from "../../assets/ballgame/ball (2).png";
import Ball3 from "../../assets/ballgame/ball (3).png";
import Ball4 from "../../assets/ballgame/ball (4).png";
import Ball5 from "../../assets/ballgame/ball (5).png";
import Ball6 from "../../assets/ballgame/ball (6).png";
import WinningResult from "../winningResult";
import Form from "../Form/Form";
import Confetti from "react-confetti";
import preview from "../../assets/fillerimg.png";
import Title from "../Title";
import bgimage from "../../assets/ballgame/bgilus.png";
import star from "../../assets/ballgame/stari.png";
import prizeimg from "../../assets/ballgame/prizeimg.png";

const ballImages = [Ball1, Ball2, Ball3, Ball4, Ball5, Ball6];

function BallGame() {
  const [rotate, setRotate] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [prize, setprize] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(true);
  const [selectedBall, setSelectedBall] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [page, setpage] = useState(2);

  const handlePage = () => {
    setpage(page + 1);
  };

  const handleClick = () => {
    if (!animationEnded) return; // Prevent multiple clicks while animation is playing
    setRotate(true);
    setAnimationEnded(false);
    // After rotate animation ends, start shaking animation
    setTimeout(() => {
      setShaking(true);
    }, 1000); // Adjust timing to match rotateAnimation duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * ballImages.length);
      setSelectedBall(ballImages[randomIndex]);
    }, 2000);
    // Reset animations and states after animations complete
    setTimeout(() => {
      setRotate(false);
      setShaking(false);
      setAnimationEnded(true);
      setprize(true);
      setTimeout(() => {
        setShowPopup(true);
      }, 2000); // Adjust timing to match total animation duration
    }, 3000); // Adjust timing to match total animation duration
  };

  const handleEnd = () => {
    setpage(0);
    setShowPopup(false);
    setSelectedBall(null);
    setprize(false)
  };

  return (
    <div className={styles.main}>
      {page === 0 && (
        <div className={styles.page0}>
          <Title type="ballgame" />
          <h2
            style={{ fontFamily: "cb", textAlign: "center" }}
            className={styles.title2}
          >
            Here at Skratchville we help organizations like yours generate new
            leads, create innovative customer and staff incentives, all whilst
            saving both time and money!
          </h2>
          <img src={bgimage} style={{ width: "15rem" }} />
          <button className={styles.enterBtn} onClick={handlePage}>
            Enter Now
          </button>
        </div>
      )}
      {page === 1 && (
        <Form
          type="ballgame"
          setPage={handlePage}
          accentColor="blue"
          preview={preview}
        />
      )}
      {page === 2 && (
        <div className={styles.gameDiv}>
          <div className={styles.ballDiv1}>
            <img
              src={Ball2}
              className={`${styles.Ball2} ${shaking ? styles.Ball2a : ""}`}
            />

            <img
              src={Ball4}
              className={`${styles.Ball2} ${shaking ? styles.Ball2a : ""}`}
            />
          </div>
          <div className={styles.ballDiv}>
            <img
              src={Ball2}
              className={`${styles.Ball2} ${shaking ? styles.Ball4a : ""}`}
            />
            <img
              src={Ball3}
              className={`${styles.Ball2} ${shaking ? styles.Ball3a : ""}`}
            />
            <img
              src={Ball4}
              className={`${styles.Ball2} ${shaking ? styles.Ball4a : ""}`}
            />
          </div>

          <img
            src={glass1}
            className={`${styles.glass1} ${shaking ? styles.shake : ""}`}
          />
          <img src={gameI} className={styles.gamei} />
          <img
            src={switch1}
            alt="Switch"
            className={`${styles.switch1} ${rotate ? styles.animate : ""}`}
            onClick={handleClick}
          />
          <button className={styles.leverBtn} onClick={handleClick}>Play</button>
          {selectedBall && <img src={selectedBall} className={styles.Ball1} />}
        </div>
      )}
      {prize && (
        <div className={styles.popDiv}>
          <div className={styles.popCont}>
            <h1>You Won!!</h1>
            <img src={prizeimg} style={{width:'6rem'}}/>
            <div className={styles.starDiv}>
              <img src={star} style={{ width: "4rem" }} />
              <img
                src={star}
                style={{ width: "4rem", transform: "scaleX(-1)" }}
              />
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <>
          <WinningResult handlewin={handleEnd} />
          <Confetti style={{ zIndex: "9999999",width:'100%' }} />
        </>
      )}
    </div>
  );
}
export default BallGame;
