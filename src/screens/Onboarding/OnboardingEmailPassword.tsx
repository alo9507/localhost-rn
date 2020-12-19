import React, { useContext, useState } from "react"
import { View, Button, ActivityIndicator } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";

const OnboardingEmailPassword = ({ item, goToNext, slideNumber }) => {
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
        // optimistically go to next page
        goToNext(slideNumber)

        try {
            const authSession = await appState.authManager.signUp(formState.email, formState.password)
            const user = await appState.userRepository.createUser(authSession.userId, formState.email)
            setAppState({ type: "UPDATE_USER", payload: user })
        } catch (e) {
            console.log("Error signing up:", e);
        }

        // how to return if an error occurs?
    }

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <Input
                    onChangeText={(val) => setInput("email", val)}
                    value={formState.email}
                    placeholder="Email"
                />
                <Input
                    onChangeText={(val) => setInput("password", val)}
                    value={formState.password}
                    placeholder="Password"
                />
                <Button title="Next" onPress={submitAndGoToNext} />
                <ActivityIndicator size="large" />
            </Container>
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

export default OnboardingEmailPassword