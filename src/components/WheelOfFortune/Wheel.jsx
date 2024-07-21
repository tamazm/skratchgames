import React, { useRef, useEffect, useState } from "react";
import frame from "./assets/frame.png";
import tick from "./assets/tick.png";
import center from "./assets/center.png";
import "./Wheel.css"; // Add any styles related to the wheel here
import { useMainContext } from "./MainContext";

import play from "./assets/play.png";
import spin from "./assets/spin.png";

const Wheel = ({ buttonOnClick, buttonContent = "PLAY", functional }) => {
  const { setPage, showConfetti } = useMainContext();
  const wheelRef = useRef(null);
  const spinButtonRef = useRef(null);
  const [previousEndDegree, setPreviousEndDegree] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    const wheel = wheelRef.current;
    if (!wheel || spinning) return; // Prevent spinning if already spinning
    setSpinning(true); // Set spinning to true

    // Calculate the new end degree
    const randomAdditionalDegrees = Math.random() * 360 + (functional ? 1800 : 720); // 5 to 10 full spins for functional, 2 to 4 full spins for non-functional
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    // Reset the transition
    wheel.style.transition = "none";
    wheel.style.transform = `rotate(${previousEndDegree}deg)`;

    // Use requestAnimationFrame to apply the new transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const delay = functional ? 0 : 4000;
        const duration = functional ? 6 : 2.25;
        const easing = functional ? "cubic-bezier(0.440, -0.205, 0.000, 1)" : "ease";

        setTimeout(() => {
          wheel.style.transition = `transform ${duration}s ${easing}`;
          wheel.style.transform = `rotate(${newEndDegree}deg)`;
          if (functional) {
            wheel.classList.add("spinning");
          }
        }, delay);
      });
    });

    // Update the previous end degree
    setPreviousEndDegree(newEndDegree);

    // Handle the end of the transition
    const handleTransitionEnd = () => {
      setSpinning(false); // Set spinning to false when done
      wheel.classList.remove("spinning");
      wheel.removeEventListener("transitionend", handleTransitionEnd);

      if (functional) {
        showConfetti(true);
        setTimeout(() => {
          setPage(4);
        }, 750);
      } else {
        // setTimeout(() => {
        //   spinWheel();
        // }, 500);
      }
    };

    wheel.addEventListener("transitionend", handleTransitionEnd);
  };

  useEffect(() => {
    const spinButton = spinButtonRef.current;

    if (functional) {
      if (!spinButton) return;

      const handleSpinClick = () => {
        spinWheel();
      };

      spinButton.addEventListener("click", handleSpinClick);

      return () => {
        spinButton.removeEventListener("click", handleSpinClick);
      };
    } else {
      spinWheel(); // Start spinning immediately and loop in non-functional mode
    }
  }, [functional]);

  return (
    <>
      <div
        className="wheel-container"
        style={{
          position: "relative",
          display: "flex",
          margin: "8rem 0",
          justifyContent: "center",
          alignItems: "center",
          transform: "scale(1.3)",
        }}
      >
        <img
          style={{
            position: "absolute",
            width: "30%",
            marginTop: "5%",
            zIndex: "1",
          }}
          src={frame}
          alt="Frame"
          draggable={false}
        />
        <img
          style={{
            position: "absolute",
            width: "3.5%",
            marginTop: "-20.75%",
            zIndex: "1",
          }}
          src={tick}
          alt="Tick"
          draggable={false}
        />
        <ul ref={wheelRef} className="ui-wheel-of-fortune">
          <li>
            <div className="text-wrapper" style={{ textIndent: "53.5%" }}>
              110 $
            </div>
          </li>
          <li>
            <div className="text-wrapper">800 $</div>
          </li>
          <li>
            <div className="text-wrapper">150 $</div>
          </li>
          <li>
            <div className="text-wrapper">100 $</div>
          </li>
          <li>
            <div className="text-wrapper" style={{ fontSize: "6.25cqi", textIndent: "34.5%" }}>
              JACKPOT
            </div>
          </li>
          <li>
            <div className="text-wrapper">700 $</div>
          </li>
          <li>
            <div className="text-wrapper">250 $</div>
          </li>
          <li>
            <div className="text-wrapper">600 $</div>
          </li>
          <li>
            <div className="text-wrapper">350 $</div>
          </li>
          <li>
            <div className="text-wrapper">400 $</div>
          </li>
          <li>
            <div className="text-wrapper" style={{ textIndent: "53.5%" }}>
              LOSE
            </div>
          </li>
          <li>
            <div className="text-wrapper">600 $</div>
          </li>
        </ul>
        <img
          style={{
            position: "absolute",
            width: "4%",
            zIndex: "1",
          }}
          src={center}
          alt="Center"
          draggable={false}
        />
      </div>

      <button
        style={{
          padding: "0 1rem",
          cursor: "pointer",
          borderRadius: "12px",
          margin: "0 auto",
          marginTop: "4rem",
          color: "gold",
          width: "fit-content",
          zIndex: "99",
          fontSize: "1.75rem",
        }}
        type="button"
        ref={spinButtonRef}
        disabled={functional ? spinning : false} // Disable the button while spinning
        onClick={buttonOnClick}
      >
        {/* {buttonContent} */}
        <img style={{ width: "7rem" }} src={buttonContent === "PLAY" ? play : spin} />
      </button>
    </>
  );
};

export default Wheel;
