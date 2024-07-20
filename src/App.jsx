import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlotsMachine4 from "./components/SlotsMachine4";
import Game1 from "./components/Game/Main";
import QuizzGame3 from "./components/QuizGame3";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wheel-of-fortune" element={<Game1 />} />
        <Route path="/slots-machine" element={<SlotsMachine4 />} />
        <Route path="/quiz-game" element={<QuizzGame3 />} />
      </Routes>
    </Router>
  );
}

export default App;
