import React, { useReducer } from "react";
import EducationContext from "./EducationContext";

const EducationProvider = ({ children }) => {

    const initialState: any = []

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'UPDATE_EDUCATION':
                    console.log("ACTION IN EDUCATION PROVIDER", action)
                    return action.payload
                default:
                    throw new Error('Unsupported action type: ', action.type);
            }
        },
        initialState
    );

    return (
        <EducationContext.Provider value={[state, dispatch]}>
            {children}
        </EducationContext.Provider>
    );
};

export default EducationProvider;
