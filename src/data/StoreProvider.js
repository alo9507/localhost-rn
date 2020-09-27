import React, { useState } from "react";
import StoreContext from "./StoreContext";

type StoreProviderProps = {
  children: any,
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  // const store = useLocalStore(() => ({}));
  const [state, setState] = useState({});

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
