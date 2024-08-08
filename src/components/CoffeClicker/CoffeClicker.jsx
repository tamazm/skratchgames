import { useEffect, useState } from "react";
import styles from "./CoffeClicker.module.css";
import bg from "../../assets/coffeclicker/bg.png";
import CC from "../../assets/coffeclicker/CoffeeClicker.png";
import EnterBtn from "../../assets/coffeclicker/EnterBtn.png";
import cosCursor from "../../assets/coffeclicker/mouse.png";

function CoffeClicker() {
  const [page, setPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive || secondsLeft === 0) return; // Stop the timer when it reaches zero

    const timer = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    setSecondsLeft(5);
    setIsActive(true);
    if (setIsActive === true) {
        setCount( count + 1)
    }
  };
  const handlePage = () => {
    setPage(page + 1);
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
        <div className={styles.page1}>
          <div className={styles.countDiv}>
            <h1 style={{ fontFamily: "bs" }}>{count}</h1>
          </div>
          <img src={CC} className={styles.CoffeClicker} onClick={handleStart}/>
        </div>
      )}
    </div>
  );
}

export default CoffeClicker;
