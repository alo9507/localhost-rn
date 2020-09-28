import React, { useState } from "react";
import StoreContext from "./StoreContext";

const StoreProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
