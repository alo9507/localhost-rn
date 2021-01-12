import React, { useReducer } from "react";
import EditProfileContext from "./EditProfileContext";
import getInitialState from "./InitialState";

const EditProfileProvider = ({ children }) => {

    let initialState = getInitialState()

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'PATCH_USER':
                    return prevState;
                default:
                    throw new Error('Unsupported action type: ', action.type);
            }
        },
        initialState
    );

    console.log(state)

    return (
        <EditProfileContext.Provider value={[state, dispatch]} >
            { children}
        </EditProfileContext.Provider>
    );
};

export default EditProfileProvider;
