import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [page, setPage] = useState(1);
  const [confetti, showConfetti] = useState(false);

  const [loading, setLoading] = useState(true);

  return (
    <MainContext.Provider value={{ loading, setLoading, page, setPage, confetti, showConfetti }}>{children}</MainContext.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContext);
}

export default MainContext;
