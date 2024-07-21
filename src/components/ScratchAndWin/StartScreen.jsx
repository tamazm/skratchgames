import React, { useState } from "react";
import Title from "../Title";
import { useMainContext } from "./MainContext";
import SmileyImgPreview from "./SmileyImgPreview";
import { motion } from "framer-motion";

function StartScreen() {
  const { page, setPage } = useMainContext();
  const [smileyValues, setSmileyValues] = useState(["300$", "1000$", "100$"]); // Example initial values

  const handleUpdate = (value, index) => {
    const newValues = [...smileyValues];
    newValues[index] = value;
    setSmileyValues(newValues);
  };

  const handleScratchUpdate = (index, status, percentage) => {
    // console.log(`Smiley ${index} scratched: ${status}, ${percentage}%`);
  };

  return (
    <div style={{ position: "relative", bottom: "2.5rem", display: page === 1 ? "flex" : "none", flexDirection: "column" }}>
      <Title type="scratch" />

      <h6
        className="info w-full max-w-xs mx-auto"
        style={{
          color: "#FFF",
          textAlign: "center",
          marginTop: "2rem",
          fontWeight: "500",
        }}
      >
        Here at Skratchville we help organizations like yours generate new leads, create innovative customer and staff incentives, all
        whilst saving both time and money!
      </h6>

      <div
        className="md:scale-100 scale-[0.575] md:mt-12 -mt-8 md:mb-12 -mb-8 mx-auto smaller:scale-[0.45]"
        style={{
          borderRadius: "12px",
          padding: "4.5rem 2.5rem",
          background: "linear-gradient(to right, #63a8e1, #0272ce)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "fit-content",
          // margin: "4rem auto",
          color: "#fff",
          gap: "2rem",
          boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2), 0px 5px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-[1.6rem] md:text-[1.65rem] font-sans">SCRATCH THE GLOSSY SURFACE INSIDE THE FIELD</h1>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {smileyValues.map((value, index) => (
            <SmileyImgPreview
              functional={false}
              animationType={index + 1}
              key={index}
              randomValue={value}
              onUpdate={(val) => handleUpdate(val, index)}
              onScratchUpdate={(status, percentage) => handleScratchUpdate(index, status, percentage)}
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={() => setPage(2)}
        whileTap={{ scale: 0.85 }}
        style={{
          width: "fit-content",
          fontWeight: "bold",
          fontSize: "1rem",
          fontSize: "1.35rem",
          outline: "none",
          borderRadius: "12px",
          margin: "0 auto",
          color: "#fff",
          padding: "1rem",
          background: "linear-gradient(to right, #64a9e2, #0e79d7)",
        }}
      >
        Enter Now
      </motion.button>
    </div>
  );
}

export default StartScreen;
