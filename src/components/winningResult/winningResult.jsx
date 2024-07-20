import styles from "../SlotsMachine4/SlotsMachine4.module.css"
import facebook from "../../assets/slotsmachine/facebook-black.svg";
import twitter from "../../assets/slotsmachine/twitter-black.svg";
import linkdin from "../../assets/slotsmachine/linkdin.png";
import ilus from "../../assets/slotsmachine/ilustration1.jpg";
function winningResult() {
  return (
    <div className={styles.resultDiv}>
      <div className={styles.topDiv}>
        <img src={ilus} style={{ width: "100%" }} />
        <h1>Congrats! You've Won!</h1>
        <p>
          Get ready to celebrate! You're a winner in the recent Skratchville
          promotion!
        </p>
        <p>
          In the meantime, keep an eye out for more exciting Skratchville
          promotions! We love rewarding our loyal users, and you might just be a
          winner again soon.
        </p>
        <button
          className={styles.SBtn}
          style={{ fontSize: "1rem", padding: "0.5rem 1.5rem" }}
          onClick={() => {
            setlosing(false);
          }}
        >
          Finish
        </button>
      </div>
      <div className={styles.botDiv}>
        <p>
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
