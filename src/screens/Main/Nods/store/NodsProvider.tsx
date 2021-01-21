import React, { useReducer } from "react";
import NodsContext from "./NodsContext";

const NodsProvider = ({ children }) => {

    const initialState: any = []

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'UPDATE_NODS':
                    return action.payload
                default:
                    throw new Error('Unsupported action type: ', action.type);
            }
        },
        initialState
    );

    return (
        <NodsContext.Provider value={[state, dispatch]} >
            { children}
        </ NodsContext.Provider>
    );
};

export default NodsProvider;
