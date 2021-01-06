import React, { useContext, useState, useReducer } from "react"
import { View } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingForm from "./OnboardingForm"

const OnboardingPhoneNumber = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ phonenumber: "" });

    async function submitAndGoToNext() {
        try {
            const authSession = await appState.authManager.signUp(formState.phonenumber)
            const user = await appState.userRepository.createUser(authSession.userId, formState.phonenumber)
            setAppState({ type: "UPDATE_USER", payload: user })
            goToNext(slideNumber)
        } catch (e) {
            console.log(e)
        }
    }

    const phoneNumberErrorMessage = `
    Must contain:
    - At least 8 characters
    - One number
    `

    const controls = [
        {
            type: "text",
            label: "Phone Number",
            placeholder: "978-245-5454",
            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            errorMessage: phoneNumberErrorMessage,
            keyName: "phonenumber",
            required: true
        }
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

export default OnboardingPhoneNumber