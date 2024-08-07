import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SlotsMachine4 from "./components/SlotsMachine4";
import WheelOfFortune from "./components/WheelOfFortune/Main";
import QuizzGame3 from "./components/QuizGame3";
import "./App.css";

import ScratchAndWin from "./components/ScratchAndWin/Main";
import BallGame from "./components/BallGame";
import PrintoMato from "./components/PrintoMatoCont/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/wheel-of-fortune" element={<WheelOfFortune />} />
        <Route path="/slots-machine" element={<SlotsMachine4 />} />
        <Route path="/quiz-game" element={<QuizzGame3 />} />
        <Route path="/scratch-and-win" element={<ScratchAndWin />} />
        <Route path="/prize-machine" element={<BallGame />} />
        <Route path="/printomato" element={<PrintoMato />} />
      </Routes>
    </Router>
  );
}

export default App;
