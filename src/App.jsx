import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlotsMachine4 from "./components/SlotsMachine4";
import Game1 from "./components/Game/Main";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wheel-of-fortune" element={<Game1 />} />
        <Route path="/slots-machine" element={<SlotsMachine4 />} />
      </Routes>
    </Router>
  );
}

export default App;
