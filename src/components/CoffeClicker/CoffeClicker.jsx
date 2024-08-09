import { useEffect, useState, useRef } from "react";
import styles from "./CoffeClicker.module.css";
import bg from "../../assets/coffeclicker/bg.png";
import CC from "../../assets/coffeclicker/CoffeeClicker.png";
import EnterBtn from "../../assets/coffeclicker/EnterBtn.png";
import cosCursor from "../../assets/coffeclicker/mouse.png";
import Confetti from "react-confetti";
import WinningResult from "../../components/winningResult";
import Form from "../../components/Form/Form";
import preview from "../../assets/coffeclicker/preview.png";
import coffeeSeed from "../../assets/coffeclicker/coffeeSeed.png";

function CoffeClicker() {
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [images, setImages] = useState([]);
  const parentRef = useRef(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      setResult(true);
      setConfetti(true);
      setIsActive(false);
    } // Stop the timer when it reaches zero
    if (isActive) {
      const timer = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear the interval on component unmount
    }
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    setIsClicked(!isClicked);
    if (isActive) {
      setCount(count + 1);
      spawnImage();
    } else {
      setIsActive(true);
    }
  };
  const handlePage = () => {
    setPage(page + 1);
  };
  const handleResult = () => {
    setPage(0);
    setResult(false);
    setSecondsLeft(5);
    setCount(0);
    setConfetti(false);
  };
  const spawnImage = () => {
    const parentWidth = parentRef.current.offsetWidth;
    const parentHeight = parentRef.current.offsetHeight;

    const randomX = Math.random() * parentWidth;
    const randomY = Math.random() * parentHeight;

    const newImage = {
      id: Date.now(), // Unique ID for each image
      x: randomX,
      y: randomY,
    };

    setImages((prevImages) => [...prevImages, newImage]);

    // Remove image after it fades out (e.g., 1.5 seconds)
    setTimeout(() => {
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== newImage.id)
      );
    }, 1500);
  };
  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `url(${bg})`,
        cursor: `url(${cosCursor}), auto`,
      }}
    >
      {page === 0 && (
        <div className={styles.page0}>
          <h1 className={styles.Header}>Clicker</h1>
          <p className={styles.subText}>
            Here at Skratchville, we help organizations like yours generate new
            leads, create innovative customer and staff incentives, all whilst
            saving both time and money!
          </p>
          <img src={CC} className={styles.CoffeClicker} />
          <img
            src={EnterBtn}
            className={styles.EnterBtn}
            onClick={handlePage}
          />
        </div>
      )}
      {page === 1 && (
        <Form
          type="coffeclicker"
          accentColor="#61140e"
          preview={preview}
          gradient="linear-gradient(to right, #61140e,#181818)"
          setPage={handlePage}
        />
      )}
      {page === 2 && (
        <div className={styles.page1}>
          <div className={styles.countDiv}>
            <h1 style={{ fontFamily: "bs" }}>{count}</h1>
          </div>
          <div className={styles.coffeeSeedDiv} ref={parentRef}>
            {images.map((image) => (
              <img
                key={image.id}
                src={coffeeSeed} // Replace with your image source
                alt="Spawned"
                className={styles.spawnImage}
                style={{
                  position: "absolute",
                  left: image.x,
                  top: image.y,
                }}
              />
            ))}
          </div>
          <img
            src={CC}
            className={`${styles.CoffeClicker} ${
              isClicked ? styles.scaledUp : styles.scaledDown
            }`}
            onClick={handleStart}
          />
          <p className={styles.timerDiv}>0:0{secondsLeft}</p>
          {result && (
            <WinningResult
              handlewin={() => {
                handleResult();
              }}
            />
          )}
          {confetti && (
            <Confetti
              style={{ zIndex: "9999999", backgroundRepeat: "repeat" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CoffeClicker;
