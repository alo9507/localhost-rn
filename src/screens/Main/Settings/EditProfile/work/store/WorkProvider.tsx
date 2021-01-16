import React, { useReducer } from "react";
import WorkContext from "./WorkContext";

const WorkProvider = ({ children, initialState }) => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'UPDATE_WORK_EXPERIENCE':
                    const newState = {
                        workExperience: action.payload
                    };
                    return newState;
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
