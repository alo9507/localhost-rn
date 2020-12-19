import React, { useContext, useState } from "react"
import { View, Button } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";

const OnboardingBase = ({ children }) => {
    const [appState, setAppState] = useContext(StoreContext);

    type LoginInitialState = {
        email: string,
        password: string,
    }

    const initial: LoginInitialState = {
        email: "",
        password: ""
    }

    const [formState, setFormState] = useState(initial);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function submitAndGoToNext() {
        goToNext(slideNumber)
    }

    async function updateUser() {
        await appState.userRepository.updateUser({ id: appState.user.id, ...formState })
    }

    return (
        <View>
            {children}
        </View>
    )
}

const Input = styled.TextInput`
  height: 50px;
  width: 300px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default OnboardingBase