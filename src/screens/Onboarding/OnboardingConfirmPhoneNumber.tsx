import React, { useContext, useState, useReducer } from "react"
import { View } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingForm from "./OnboardingForm"

const OnboardingConfirmPhoneNumber = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ code: "" });

    async function submitAndGoToNext() {
        try {
            // const confirmationResponse = await appState.authManager.confirmSignUp(appState.user.phonenumber, formState.code)
            goToNext(slideNumber)
        } catch (e) {
            console.log(e)
        }
    }

    const confirmPhoneNumberErrorMessage = `Incorrect code`

    const controls = [
        {
            type: "text",
            label: "Confirm Phone Number",
            placeholder: "43434",
            pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            errorMessage: confirmPhoneNumberErrorMessage,
            keyName: "code",
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

export default OnboardingConfirmPhoneNumber