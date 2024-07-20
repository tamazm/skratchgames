import "./Form.css";

function Form() {
  return (
    <div className="form">
      <h4>Please take a moment to review the details below</h4>
      <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "space-between" }}>
        <label>
          Name
          <input />
        </label>

        <label>
          Name
          <input />
        </label>
      </div>

      <label style={{ width: "100%" }}>
        Name
        <input />
      </label>

      <div>
        <label style={{ width: "100%" }}>
          Name
          <input />
        </label>
        <p style={{ textAlign: "right", color: "#f16028", fontSize: "0.75rem" }}>
          We respect your privacy and only contact you with your permission
        </p>
      </div>

      <div
        style={{
          borderRadius: "12px",
          padding: "1rem",
          background: "#181818",
          display: "flex",
          justifyContent: "space-between",
          color: "#fff",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
          <input style={{ position: "relative", top: "0.5rem" }} type="checkbox" />

          <p style={{ fontSize: "0.8rem" }}>
            Tick to receive exclusive invites to win real money prizes and Skratchville's gamification tips and tricks.
          </p>
        </div>

        <img alt="preview" style={{ width: "5rem", objectFit: "cover" }}  />
      </div>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between", width: "100%" }}>
        <button style={{ width: "25%" }}>Submit</button>
        <p style={{ fontSize: "0.8rem"}}>
          By clicking this button you acknowledge that this promotion has been created by Skratchville for demonstration of its
          gamification technology. No real prizes are available to win. Your data will be processed according to our Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Form;
