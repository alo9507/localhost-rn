import React, { useContext, useState, useReducer } from "react"
import { Button, View } from "react-native";
import styles from "../Onboarding/OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingForm from "../Onboarding/OnboardingForm"

const OnboardingConfirmPhoneNumber = ({ item, goToNext, slideNumber, route }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ code: "" });

    const [submissionError, setSubmissionError] = useState(null);

    async function submitAndGoToNext() {
        try {
            console.log("appState.session", appState.session)
            const authSession = await appState.authManager.respondToAuthChallenge(appState.phoneNumber, formState.code, appState.session)
            const user = await appState.userRepository.getUser(authSession.userId)
            setAppState({ type: "UPDATE_USER", payload: user })
            appState.dispatch({ type: "IS_AUTHENTICATED" })
        } catch (e) {
            console.log(e)
            setSubmissionError(e)
        }
    }

    const confirmPhoneNumberErrorMessage = `Incorrect code`

    const controls = [
        {
            type: "text",
            label: "Confirm Phone Number",
            placeholder: "123456",
            pattern: /\d{6}/,
            errorMessage: confirmPhoneNumberErrorMessage,
            keyName: "code",
            required: true
        }
    ]

    const bgStyle = { backgroundColor: item?.backgroundColor }

    const resendConfirmationCode = async () => {
        const success = await appState.authManager.resendConfirmationCode(appState.phoneNumber)
        console.log(success)
    }

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
                <br /><br /><br /><br />
                <Button title="Resend Code" onPress={() => resendConfirmationCode()} />
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

export default OnboardingConfirmPhoneNumber