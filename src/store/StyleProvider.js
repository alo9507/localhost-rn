import React, { useEffect, useState, useReducer } from "react";
import StyleContext from "./StyleContext";
const env = require("../../env.json");
import { initialState } from "./InitialState";

const StyleProvider = ({ children }) => {

    const globalStyle = {
        color: {
            primaryText: "#4D58A7",
            primaryText_darker: "#525DB3",
            primaryText_darkest: "#41498C",
            good_dark: "#35773F",
            good_light: "#65996E",
            error_dark: "#9A3548"
        }
    };

    return (
        <StyleContext.Provider value={globalStyle}>
            {children}
        </StyleContext.Provider>
    );
};

export default StyleProvider;
