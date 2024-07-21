import styles from "../SlotsMachine4/SlotsMachine4.module.css";
import facebook from "../../assets/slotsmachine/facebook-black.svg";
import twitter from "../../assets/slotsmachine/twitter-black.svg";
import linkdin from "../../assets/slotsmachine/linkdin.png";
import ilus from "../../assets/slotsmachine/ilustration1.jpg";
function winningResult({ handlewin }) {
  return (
    <div className={styles.resultDiv}>
      <div className={styles.topDiv}>
        <img src={ilus} style={{ width: "100%" }} />
        <h1 style={{ fontSize: "1.2rem", fontWeight: "900" }}>
          Thanks for playing!
        </h1>
        <p style={{ fontSize: "1rem" }}>Get ready to celebrate!</p>
        <p style={{ fontSize: "0.8rem", padding: "0rem 1rem 0rem 1rem" }}>
          As this is only a demo there are no prizes anyway, so you haven't
          actually lost out. If you like the idea of gamified incentives for
          your prospects, customers or teams, we're ready to help you set it up.
        </p>
        <button
          className={styles.SBtn}
          style={{
            fontSize: "1rem",
            padding: "0.5rem 1.5rem",
            marginBottom: "1rem",
          }}
          onClick={handlewin}
        >
          Finish
        </button>
      </div>
      <div className={styles.botDiv}>
        <p style={{ fontSize: "0.8rem" }}>
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
export default winningResult;
