import React, { useContext, useState, useReducer } from "react"
import { View } from "react-native";
import styles from "../Onboarding/OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingForm from "../Onboarding/OnboardingForm"

const PhoneNumber = ({ item, goToNext, slideNumber, isSignIn, navigation, route }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ phoneNumber: "" });

    const [submissionError, setSubmissionError] = useState(null);

    async function submitAndGoToNext() {
        if (route?.params?.isSignIn) {
            try {
                const { session } = await appState.authManager.signIn(formState.phoneNumber, "Abc123!!")
                setAppState({ type: "SET_MFA_SESSION", payload: { session, phoneNumber: formState.phoneNumber } })
                navigation.navigate("ConfirmSignIn", { isSignIn: true })
            } catch (e) {
                setSubmissionError(e)
                console.log("error", e)
            }
        } else {
            try {
                const { userId } = await appState.authManager.signUp(formState.phoneNumber)
                const { session } = await appState.authManager.signIn(formState.phoneNumber, "Abc123!!")
                const createdUser = await appState.userRepository.createUser(userId, formState.phoneNumber)
                const user = await appState.userRepository.getUser(userId)
                setAppState({ type: "UPDATE_USER", payload: user })
                setAppState({ type: "SET_MFA_SESSION", payload: { session, phoneNumber: formState.phoneNumber } })
                goToNext(slideNumber)
            } catch (e) {
                setSubmissionError(e)
                console.log("error", e)
            }
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
            pattern: /^\+1\d{3}\d{3}\d{4}$/,
            errorMessage: phoneNumberErrorMessage,
            keyName: "phoneNumber",
            required: true
        }
    ]

    const bgStyle = { backgroundColor: item?.backgroundColor }

    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <OnboardingForm
                    onSubmit={submitAndGoToNext}
                    controls={controls}
                    formState={formState}
                    setFormState={setFormState}
                    submissionError={submissionError}
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

export default PhoneNumber