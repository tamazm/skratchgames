import { useState } from "react";
import styles from "./SlotsMachine4.module.css";
import Scanvas from "../../assets/slotsmachine/slotscanvas.png";
import Sbg from "../../assets/slotsmachine/slotsbg.png";
import item1 from "../../assets/slotsmachine/item (1).png";
import item2 from "../../assets/slotsmachine/item (2).png";
import item3 from "../../assets/slotsmachine/item (3).png";
import Form from "../Form/Form";

import title from "../../assets/slotsmachine/slottitle.png";
import WinningResult from "../winningResult";
import LosingResult from "../losingResult";
import preview  from "../../assets/slotsmachine/pre.png";

function SlotsMachine4() {
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [winning, setwinning] = useState(false);
  const [losing, setlosing] = useState(false);
  const imageSources = [item1, item2, item3];
  const [page, setpage] = useState(0);

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
  const handlePage = () => {
    setpage(page + 1);
  };
  const randomImage = getRandomImage(imageSources);
  const randomImage2 = getRandomImage(imageSources);
  const randomImage3 = getRandomImage(imageSources);

  return (
    <div className={styles.main}>
      {winning && (
        <WinningResult
          handlewin={() => {
            setwinning(false);
            setpage(0)
          }}
        />
      )}
      {losing && (
        <LosingResult
          handlelose={() => {
            setlosing(false);
            setpage(0)
          }}
        />
      )}
      {page === 0 && (
        <>
        <img src={title} style={{width:"25rem"}} />
          <h2 style={{fontFamily:'cb',textAlign:'center',width:'50%'}}>
            Here at Skratchville we help organizations like yours generate new
            leads, create innovative customer and staff incentives, all whilst
            saving both time and money!
          </h2>
          <div className={styles.slotDiv}>
            <div className={styles.itemCont} style={{ bottom: "80%",width:'75%' }}>
              <div
                className={`${styles.itemDiv} ${
                   styles.animate33 
                }`}
              >
                <img src={item1} className={styles.item} />
                <img src={item2} className={styles.item} />
                <img src={item3} className={styles.item} />
              </div>
              <div
                className={`${styles.itemDiv} ${
                   styles.animate44
                }`}
              >
                <img src={item1} className={styles.item} />
                <img src={item2} className={styles.item} />
                <img src={item3} className={styles.item} />
              </div>
              <div
                className={`${styles.itemDiv} ${
                   styles.animate55
                }`}
              >
                <img src={item1} className={styles.item} />
                <img src={item2} className={styles.item} />
                <img src={item3} className={styles.item} />
              </div>
            </div>
            <img src={Scanvas} alt="canvas" className={styles.slotCanvas} style={{width:'30rem'}}/>
            <img src={Sbg} className={styles.Sbg} />
          </div>
          <button
            className={styles.SBtn}
            onClick={handlePage}
            style={{ padding: "1rem" }}
          >
            Enter now
          </button>
        </>
      )}
      {page === 1 && (
        <>
          <Form preview={preview} setPage={handlePage} accentColor={"Red"} gradient={'linear-gradient(to right, #960000 0%, #d40000 11%, #c20000 53%, #f70000 100%)'}/>
        </>
      )}
      {page === 2 && (
        <>
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
                className={`${styles.itemDiv} ${
                  animate2 ? styles.animate3 : ""
                }`}
              >
                <img src={item1} className={styles.item} />
                <img src={item2} className={styles.item} />
                <img src={item3} className={styles.item} />
              </div>
              <div
                className={`${styles.itemDiv} ${
                  animate2 ? styles.animate4 : ""
                }`}
              >
                <img src={item1} className={styles.item} />
                <img src={item2} className={styles.item} />
                <img src={item3} className={styles.item} />
              </div>
              <div
                className={`${styles.itemDiv} ${
                  animate2 ? styles.animate5 : ""
                }`}
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
        </>
      )}
    </div>
  );
}
export default SlotsMachine4;
