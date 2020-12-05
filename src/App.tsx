import { registerRootComponent } from "expo";
import React from "react";
import StoreProvider from "./store/StoreProvider";
import Root from "./Root"

const App = () => {
  return (
    <StoreProvider>
      <Root />
    </StoreProvider>
  )
};

registerRootComponent(App);
