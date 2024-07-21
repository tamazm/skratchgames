import React, { useState, useEffect } from "react";
import SmileyImgPreview from "./SmileyImgPreview";

import { useMainContext } from "./MainContext";
import Title from "../Title";

function Game() {
  const { page, setPage, setWinning, showConfetti } = useMainContext();

  const [values, setValues] = useState([]);
  const [scratchedStatuses, setScratchedStatuses] = useState([false, false, false]);
  const [progress, setProgress] = useState([0, 0, 0]);

  const generateRandomValue = () => {
    const possibleValues = ["10$", "110$", "35$", "100$", "900$", "200$", "650$", "LOSE", "JACKPOT"];
    return possibleValues[Math.floor(Math.random() * possibleValues.length)];
  };

  const handleUpdate = (value, index) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleScratchUpdate = (index, status, percentage) => {
    setScratchedStatuses((prevStatuses) => {
      const newStatuses = [...prevStatuses];
      newStatuses[index] = status;
      return newStatuses;
    });
    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[index] = percentage;
      return newProgress;
    });
  };

  useEffect(() => {
    const newValues = Array.from({ length: 3 }, generateRandomValue);
    setValues(newValues);
  }, []);

  useEffect(() => {
    if (scratchedStatuses.every((status) => status)) {
      setWinning(new Set(values).size === 1);
    }
  }, [scratchedStatuses, values]);

  useEffect(() => {
    const countAtLeastTwo = progress.every((prog) => prog >= 0.2);
    console.log(progress);

    if (countAtLeastTwo) {
      showConfetti(true);
      setPage(4);
    }
  }, [progress, setPage]);

  useEffect(() => {
    const handleTouchMove = (event) => {
      event.preventDefault();
    };

    if (page === 3) {
      // Check if the component is visible
      window.scrollTo(0, 0);

      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      if (page === 3) {
        window.scrollTo(0, 0);

        window.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [page]);

  return (
    <div
      className="text-white transform zoom-[50%] sm:zoom-[50%] md:scale-100 relative bottom-[5rem] md:bottom-[2rem]"
      style={page === 3 ? {} : { display: "none" }}
    >
      <Title bigger={true} type="scratch" />

      <div
        style={{
          borderRadius: "12px",
          padding: "4.5rem 2.5rem",
          background: "linear-gradient(to right, #63a8e1, #0272ce)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "fit-content",
          margin: "0 auto",
          gap: "2rem",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), 0px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="text-[1.25rem] md:text-[1.65rem] font-sans"
          style={{
            textAlign: "center",
            userSelect: "none",
          }}
        >
          SCRATCH THE GLOSSY SURFACE INSIDE THE FIELD
        </h1>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {values.map((value, index) => (
            <SmileyImgPreview
              id={index}
              key={index}
              functional={true}
              randomValue={value}
              onUpdate={(val) => handleUpdate(val, index)}
              onScratchUpdate={(status, percentage) => handleScratchUpdate(index, status, percentage)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
