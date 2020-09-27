import React, { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const theme = {
    color: "yellow",
  };

  const [state, setState] = useState(theme);

  return (
    <ThemeContext.Provider value={[state, setState]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
