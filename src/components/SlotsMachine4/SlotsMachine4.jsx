import { useState } from "react";
import styles from "./SlotsMachine4.module.css";
import Scanvas from "../../assets/slotsmachine/slotscanvas.png";
import Sbg from "../../assets/slotsmachine/slotsbg.png";
import item1 from "../../assets/slotsmachine/item (1).png";
import item2 from "../../assets/slotsmachine/item (2).png";
import item3 from "../../assets/slotsmachine/item (3).png";

import WinningResult from "../winningResult";
import LosingResult from "../losingResult";

function SlotsMachine4() {
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [winning, setwinning] = useState(false);
  const [losing, setlosing] = useState(false);
  const imageSources = [item1, item2, item3];

  const animateDivs = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate2(true);
      setTimeout(() => {
        setAnimate2(false);
      }, 3000);
    }, 500);
  };
  const handlewinning = () => {
    if (randomImage === randomImage2 && randomImage2 === randomImage3) {
      setwinning(true);
    } else {
      setlosing(true);
    }
  };
  const handleSpin = () => {
    animateDivs();
    setTimeout(() => {
      setAnimate(false);
      setTimeout(() => {
        handlewinning();
      }, 1500);
    }, 3500);
  };

  const getRandomImage = (images) => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const randomImage = getRandomImage(imageSources);
  const randomImage2 = getRandomImage(imageSources);
  const randomImage3 = getRandomImage(imageSources);

  return (
    <div className={styles.main}>
      {winning && <WinningResult handlewin={()=>{setwinning(false)}}/>}
      {losing && <LosingResult handlelose={()=>{setlosing(false)}} />}
      <div className={styles.slotDiv}>
        <div className={styles.itemCont}>
          <div
            className={`${styles.itemDiv} ${
              animate ? styles.animate0 : styles.animate333
            }`}
          >
            <img src={randomImage} className={styles.item} />
          </div>
          <div
            className={`${styles.itemDiv} ${
              animate ? styles.animate1 : styles.animate333
            }`}
          >
            <img src={randomImage2} className={styles.item} />
          </div>
          <div
            className={`${styles.itemDiv} ${
              animate ? styles.animate2 : styles.animate333
            }`}
          >
            <img src={randomImage3} className={styles.item} />
          </div>
        </div>
        <div className={styles.itemCont} style={{ bottom: "80%" }}>
          <div
            className={`${styles.itemDiv} ${animate2 ? styles.animate3 : ""}`}
          >
            <img src={item1} className={styles.item} />
            <img src={item2} className={styles.item} />
            <img src={item3} className={styles.item} />
          </div>
          <div
            className={`${styles.itemDiv} ${animate2 ? styles.animate4 : ""}`}
          >
            <img src={item1} className={styles.item} />
            <img src={item2} className={styles.item} />
            <img src={item3} className={styles.item} />
          </div>
          <div
            className={`${styles.itemDiv} ${animate2 ? styles.animate5 : ""}`}
          >
            <img src={item1} className={styles.item} />
            <img src={item2} className={styles.item} />
            <img src={item3} className={styles.item} />
          </div>
        </div>
        <img src={Scanvas} alt="canvas" className={styles.slotCanvas} />
        <img src={Sbg} className={styles.Sbg} />
      </div>
      <button className={styles.SBtn} onClick={handleSpin}>
        Spin
      </button>
    </div>
  );
}
export default SlotsMachine4;
