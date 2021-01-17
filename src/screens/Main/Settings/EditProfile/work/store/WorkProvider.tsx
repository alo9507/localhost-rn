import React, { useReducer } from "react";
import WorkContext from "./WorkContext";

const WorkProvider = ({ children }) => {

    const initialState: any = []

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'UPDATE_WORK_EXPERIENCE':
                    console.log("UPDATE_WORK_EXPERIENCE", action.payload)
                    return action.payload
                default:
                    throw new Error('Unsupported action type: ', action.type);
            }
        },
        initialState
    );

    return (
        <WorkContext.Provider value={[state, dispatch]}>
            {children}
        </WorkContext.Provider>
    );
};

export default WorkProvider;
