import { motion } from "framer-motion";
import "./Form.css";
import { useMainContext } from "../Game/MainContext";

import preview from "../Game/assets/mockup.png";
import Popup from "reactjs-popup";

function Form({ accentColor = "#c6aa60", gradient = "linear-gradient(to right, #ad8214, #f4da53)" }) {
  const { setPage } = useMainContext();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h1 style={{ color: "gold", textAlign: "center", fontSize: "4rem" }}>WHEEL OF</h1>
        <h1
          style={{
            color: "gold",
            textAlign: "center",
            fontSize: "4rem",
          }}
        >
          FORTUNE{" "}
        </h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="form"
      >
        <h4
          style={{
            color: accentColor,
            fontSize: "1.1rem",
            fontWeight: "800",
          }}
        >
          Please take a moment to review the details below
        </h4>
        <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "space-between" }}>
          <label>
            Name
            <input />
          </label>

          <label>
            Last Name
            <input />
          </label>
        </div>

        <label style={{ width: "100%" }}>
          Phone
          <input />
        </label>

        <div>
          <label style={{ width: "100%" }}>
            Email
            <input placeholder="example@gmail.com" />
          </label>
          <p style={{ textAlign: "right", color: accentColor, fontSize: "0.75rem", marginTop: "0.5rem" }}>
            We respect your privacy and only contact you with your permission
          </p>
        </div>

        <div
          style={{
            borderRadius: "12px",
            background: "#181818",
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
            gap: "1rem",
          }}
          className="checkbox-cont"
        >
          <div style={{ width: "100%", padding: "1rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <input style={{ minWidth: "20px", position: "relative", top: "0.5rem" }} type="checkbox" />

            <p
              className="tick-text"
              style={{
                fontSize: "0.8rem",
              }}
            >
              Tick to receive exclusive invites to win real money prizes and Skratchville's gamification tips and tricks.
            </p>
          </div>

          <img
            src={preview}
            alt="preview"
            className="form-checkbox-preview"
            style={{
              width: "25%",
              objectFit: "cover",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
          <button
            style={{
              width: "30%",
              padding: "1rem",
              borderRadius: "12px",
              background: gradient,
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={() => setPage(3)}
          >
            Submit
          </button>
          <p className="text-privacy-policy" style={{ fontSize: "0.6rem", opacity: "0.75", width: "70%" }}>
            By clicking this button you acknowledge that this promotion has been created by Skratchville for demonstration of its
            gamification technology. No real prizes are available to win. Your data will be processed according to our{" "}
            <Popup
              trigger={
                <span
                  style={{
                    cursor: "pointer",
                    color: accentColor,
                  }}
                >
                  Privacy Policy.
                </span>
              }
              modal
            >
              <div>
                <h1>PRIVACY POLICY</h1>
              </div>
            </Popup>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Form;
