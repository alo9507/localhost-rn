import React, { useContext, useState, useReducer } from "react"
import { View } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingForm from "./OnboardingForm"

const OnboardingEmailPassword = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ email: "", password: "" });

    async function submitAndGoToNext() {
        try {
            const authSession = await appState.authManager.signUp(formState.email, formState.password)
            const user = await appState.userRepository.createUser(authSession.userId, formState.email)
            setAppState({ type: "UPDATE_USER", payload: user })
            goToNext(slideNumber)
        } catch (e) {
            console.log(e)
        }
    }

    const passwordErrorMessage = `
    Must contain:
    - At least 8 characters
    - One number
    `

    const emailErrorMessage = `
    Please enter a valid email address:
    - example@g.com
    `

    const controls = [
        {
            type: "text",
            label: "Email",
            placeholder: "email",
            pattern: "",
            errorMessage: "message",
            keyName: "email",
            required: true
        },
        {
            type: "text",
            label: "Password",
            placeholder: "password",
            pattern: "",
            errorMessage: "password error message",
            keyName: "password",
            required: true
        },
    ]

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <OnboardingForm
                    onSubmit={submitAndGoToNext}
                    controls={controls}
                    formState={formState}
                    setFormState={setFormState}
                />
            </Container>
        </View>
    )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const NextButton = styled.Button`
    background: gray;
`

export default OnboardingEmailPassword