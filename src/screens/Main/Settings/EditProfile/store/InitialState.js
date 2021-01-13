import React, { useContext } from "react";
import StoreContext from "../../../../../store/StoreContext";

const getInitialState = () => {
    const [appState, setAppState] = useContext(StoreContext);

    const {
        id,
        firstname,
        lastname,
        bio,
        isVisible,
        sex,
        age,
        email,
        phonenumber,
        schools,
        workExperience,
        hometown,
        profileImageUrl,
    } = appState.user;

    let initialUserState = {
        id,
        firstname,
        lastname,
        bio,
        isVisible,
        sex,
        age,
        email,
        phonenumber,
        schools,
        workExperience,
        hometown,
        profileImageUrl,
    };

    return initialUserState;
};

export default getInitialState;