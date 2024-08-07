import { useEffect, useState } from "react";
import styles from "./CoffeClicker.module.css";
import bg from "../../assets/coffeclicker/bg.png";
import CC from '../../assets/coffeclicker/CoffeeClicker.png';
import EnterBtn from '../../assets/coffeclicker/EnterBtn.png';
import cosCursor from '../../assets/coffeclicker/mouse.png';

function CoffeClicker() {
  const [page, setPage] = useState(0);

  return (
    <div className={styles.main} style={{ backgroundImage: `url(${bg})`, cursor:`url(${cosCursor}), auto`}}>
      {page === 0 && (
        <div className={styles.page0}>
          <h1 className={styles.Header}>Clicker</h1>
          <p className={styles.subText}>
            Here at Skratchville, we help organizations like yours generate new
            leads, create innovative customer and staff incentives, all whilst
            saving both time and money!
          </p>
          <img src={CC} className={styles.CoffeClicker} />
          <img src={EnterBtn} className={styles.EnterBtn} />
        </div>
      )}
    </div>
  );
}

export default CoffeClicker;
