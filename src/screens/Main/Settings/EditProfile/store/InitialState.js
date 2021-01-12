import React, { useContext } from "react";
import StoreContext from "../../../../../store/StoreContext";

const getInitialState = () => {
    const [appState, setAppState] = useContext(StoreContext);

    let initialUserState = {
        firstname: appState.user.firstname,
        lastname: appState.user.lastname,
        age: appState.user.age
    };

    return initialUserState;
};

export default getInitialState;