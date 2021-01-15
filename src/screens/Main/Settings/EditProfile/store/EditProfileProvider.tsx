import React, { useReducer } from "react";
import EditProfileContext from "./EditProfileContext";
import getInitialState from "./InitialState";

const EditProfileProvider = ({ children }) => {

    let initialState = getInitialState()

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'UPDATE_USER_PATCH':
                    console.log("action.payload", action.payload)
                    return { ...prevState, ...action.payload };
                default:
                    throw new Error('Unsupported action type: ', action.type);
            }
        },
        initialState
    );

    return (
        <EditProfileContext.Provider value={[state, dispatch]} >
            { children}
        </EditProfileContext.Provider>
    );
};

export default EditProfileProvider;
