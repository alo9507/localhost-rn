import { registerRootComponent } from "expo";
import React from "react";
import StoreProvider from "./store/StoreProvider";
import StyleProvider from "./store/StyleProvider";
import Root from "./Root"

const App = () => {
  return (
    <StoreProvider>
      <StyleProvider>
        <Root />
      </StyleProvider>
    </StoreProvider>
  )
};

registerRootComponent(App);
