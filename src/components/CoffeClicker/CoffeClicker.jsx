import { useEffect, useState } from "react";
import styles from "./CoffeClicker.module.css";
import bg from "../../assets/coffeclicker/bg.png";
import CC from "../../assets/coffeclicker/CoffeeClicker.png";
import EnterBtn from "../../assets/coffeclicker/EnterBtn.png";
import cosCursor from "../../assets/coffeclicker/mouse.png";
import Confetti from "react-confetti";
import WinningResult from "../../components/winningResult";
import Form from "../../components/Form/Form";
import  preview  from "../../assets/coffeclicker/preview.png";

function CoffeClicker() {
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
 const [ isClicked, setIsClicked] = useState(false);

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
    setIsClicked(!isClicked)
    if (isActive) {
      setCount(count + 1);
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
        <Form type="coffeclicker" accentColor="#61140e" preview={preview} gradient="linear-gradient(to right, #61140e,#181818)" setPage={handlePage}/>
      )}
      {page === 2 && (
        <div className={styles.page1}>
          <div className={styles.countDiv}>
            <h1 style={{ fontFamily: "bs" }}>{count}</h1>
          </div>
          <img src={CC} className={`${styles.CoffeClicker} ${isClicked ? styles.scaledUp : styles.scaledDown}`} onClick={handleStart} />
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
