import styles from "../SlotsMachine4/SlotsMachine4.module.css";
import facebook from "../../assets/slotsmachine/facebook-black.svg";
import twitter from "../../assets/slotsmachine/twitter-black.svg";
import linkdin from "../../assets/slotsmachine/linkdin.png";
import ilus from "../../assets/slotsmachine/ilustration1.jpg";
function losingResult({ handlelose }) {
  return (
    <div className={styles.resultDiv}>
      <div className={styles.topDiv}>
        <img src={ilus} style={{ width: "100%" }} />
        <h1 style={{ fontSize: "1.2rem", fontWeight: "900" }}>Thanks for Playing!</h1>
        <p style={{ fontSize: "1rem" }}>Thanks for joining in the recent promotion!</p>
        <p style={{ fontSize: "0.8rem", padding: "0rem 1rem 0rem 1rem" }}>
          While you weren't a winner this time, there's always another chance to play! We have frequent promotions and contests
          happening, so keep an eye out for your next opportunity to win big.
        </p>
        <button
          className={styles.SBtn}
          style={{ fontSize: "1rem", padding: "0.5rem 1.5rem", marginBottom: "2rem" }}
          onClick={handlelose}
        >
          Finish
        </button>
      </div>
      <div className={styles.botDiv}>
        <p style={{ fontSize: "0.8rem", padding: "0rem 1rem 0rem 1rem" }}>
          Share with your friend and if they enter get another chance to win!
        </p>
        <div className={styles.socialDiv}>
          <img src={facebook} style={{ width: "2rem" }} />
          <img src={twitter} style={{ width: "2rem" }} />
          <img src={linkdin} style={{ width: "2rem" }} />
        </div>
      </div>
    </div>
  );
}
export default losingResult;
