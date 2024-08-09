import { useRef, useEffect, useState } from "react";
import styles from "./GrabberGame.module.css";
import Claw from "../../assets/grabbergame/clawhandle.png";
import ClawHand from "../../assets/grabbergame/claw1.png";
import GameWindow from "../../assets/grabbergame/canvasin.png";
import GameBtnPanel from "../../assets/grabbergame/clawcanvas.png";
import GameButton from "../../assets/grabbergame/btn 08.png";
import Glass from "../../assets/grabbergame/clawglass.png";
import GameBg from "../../assets/grabbergame/clawbg.png";
import Form from "../Form/Form";
import headerImg from "../../assets/grabbergame/clawheader.png";
import EnterGameDesign from "../../assets/grabbergame/EnterGameDesign.png";
import preview from "../../assets/grabbergame/preview.png";
import EnterBtn from "../../assets/grabbergame/EnterBtn.png";
import btnRight from "../../assets/grabbergame/btn 06.png";
import btnLeft from "../../assets/grabbergame/btn 07.png";
import WinningResult from "../winningResult";
import Confetti from "react-confetti";

function GrabberGame() {
  const [position, setPosition] = useState(0);
  const parentRef = useRef(null);
  const imageRef = useRef(null);
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [result, setResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ClawRot, setClawRot] = useState(0);
  const [page, setPage] = useState(0);
  const [confetti, setConfeti] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const images = [
    Claw,
    ClawHand,
    GameWindow,
    GameBtnPanel,
    GameButton,
    Glass,
    GameBg,
  ];
  const handlePage = () => {
    setPage(page + 1);
  };
  const handleResult = () => {
    setResult(false);
    setConfeti(false);
    setIsImageVisible(false);
    setIsAnimating(false);
    setPage(0);
  };
  const toggleImageVisibility = () => {
    setTimeout(() => {
      setIsImageVisible(true);
    }, 1000);
  };

  const handleRandomImage = () => {
    setCurrentImageIndex(Math.floor(Math.random() * images.length));
  };

  const handleGrab = () => {
    if (!isAnimating) {
      handleRandomImage();
      toggleImageVisibility();
      setIsGrabbed(true); // Trigger the animation
      setTimeout(() => {
        setIsGrabbed(false); // End the animation
        setResult(true);
        setConfeti(true);
      }, 2000); // Adjust the duration as needed
    }
  };

  const handleClawRight = () => {
    setClawRot(ClawRot + 20);
    setTimeout(() => {
      setClawRot(0);
    }, 100);
  };

  const handleClawLeft = () => {
    setClawRot(ClawRot - 20);
    setTimeout(() => {
      setClawRot(0);
    }, 100);
  };

  const handleMoveLeft = () => {
    const parentWidth = parentRef.current.offsetWidth;
    const imageWidth = imageRef.current.offsetWidth;
    handleClawLeft();
    setPosition((prevPosition) =>
      Math.max(prevPosition - 10, -0.6 * parentWidth + imageWidth)
    );
  };

  const handleMoveRight = () => {
    const parentWidth = parentRef.current.offsetWidth;
    const imageWidth = imageRef.current.offsetWidth;
    handleClawRight();
    setPosition((prevPosition) =>
      Math.min(prevPosition + 10, 0.6 * parentWidth - imageWidth)
    );
  };
  const startMovingLeft = () => {
    if (intervalId) return; // Prevent multiple intervals
    const id = setInterval(handleMoveLeft, 50); // Adjust the interval time as needed
    setIntervalId(id);
  };

  const startMovingRight = () => {
    if (intervalId) return; // Prevent multiple intervals
    const id = setInterval(handleMoveRight, 50); // Adjust the interval time as needed
    setIntervalId(id);
  };

  const stopMoving = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      const parentWidth = parentRef.current.offsetWidth;
      const imageWidth = imageRef.current.offsetWidth;
      if (event.key === "ArrowLeft") {
        handleClawLeft();
        setPosition((prevPosition) =>
          Math.max(prevPosition - 10, -0.6 * parentWidth + imageWidth)
        );
      } else if (event.key === "ArrowRight") {
        handleClawRight();
        setPosition((prevPosition) =>
          Math.min(prevPosition + 10, 0.6 * parentWidth - imageWidth)
        );
      } else if (event.key === " ") {
        if (isAnimating) {
          return null;
        } else {
          handleGrab();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `url(${GameBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {page === 0 && (
        <div className={styles.page0}>
          <img src={headerImg} className={styles.headerImg} />
          <p className={styles.HeaderText}>
            Here at Skratchville we help organizations like yours generate new
            leads, create innovative customer and staff incentives, all whilst
            saving both time and money!
          </p>
          <img src={EnterGameDesign} className={styles.EnterDesign} />
          <img
            src={EnterBtn}
            className={styles.EnterBtn}
            onClick={handlePage}
          />
        </div>
      )}
      {page === 1 && (
        <div>
          <Form
            type="claw"
            accentColor="#ff3159"
            gradient="linear-gradient(to right, #ff3159,#ff3159)"
            setPage={handlePage}
            preview={preview}
          />
        </div>
      )}
      {page === 2 && (
        <div className={styles.clawDiv}>
          <img src={GameWindow} className={styles.GameWindow} />
          <img
            src={GameBtnPanel}
            className={styles.GameBtnPanel}
            style={{ position: "absolute" }}
          />
          <img src={Glass} className={styles.Glass} />
          <div className={styles.ClawDiv} ref={parentRef}>
            <div
              className={styles.ClawCanvas}
              ref={imageRef}
              style={{ transform: `translateX(${position}px)` }}
            >
              <img
                src={ClawHand}
                className={`${styles.ClawHand} ${
                  isGrabbed ? styles.handleAnimation : ""
                }`}
                style={{
                  transform: `rotate(${ClawRot}deg)`,
                  transition: "transform 0.5s ease",
                  transformOrigin: "top center",
                }}
              />
              <img
                src={Claw}
                className={`${styles.Claw} ${
                  isGrabbed ? styles.handleAnimation : ""
                }`}
              />
              <div
                className={`${styles.itemDiv} ${
                  isGrabbed ? styles.handleAnimation : ""
                }`}
              >
                {isImageVisible && images[currentImageIndex] && (
                  <img
                    src={images[currentImageIndex]}
                    className={styles.ItemsContImg}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.ClawBtnDiv}>
            <button className={styles.PadBtn} onMouseDown={startMovingLeft} onMouseUp={stopMoving} onMouseLeave={stopMoving}>
              <img src={btnLeft} className={styles.GameButton} />
            </button>
            <button className={styles.PadBtn} onMouseDown={startMovingRight} onMouseUp={stopMoving} onMouseLeave={stopMoving}>
              <img src={btnRight} className={styles.GameButton} />
            </button>
            <button className={styles.PadBtn} onClick={handleGrab}>
              <img src={GameButton} className={styles.GameButton} />
            </button>
          </div>
        </div>
      )}
      {result && (
        <WinningResult
          handlewin={() => {
            handleResult();
          }}
        />
      )}
      {confetti && (
        <Confetti style={{ zIndex: "9999999", backgroundRepeat: "repeat" }} />
      )}
    </div>
  );
}

export default GrabberGame;
