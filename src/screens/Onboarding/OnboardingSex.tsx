import React, { useContext, useState } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"
import OnboardingForm from "./OnboardingForm"
import useCurrentUser from "../../hooks/useCurrentUser";

const OnboardingSex = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ sex: "male" });
    const [currentUser, setCurrentUser] = useCurrentUser()

    const [submissionError, setSubmissionError] = useState(null);
    console.log("slideNumber in sex", slideNumber)
    async function submitAndGoToNext() {
        try {
            const user = await appState.userRepository.updateUser({ id: currentUser.id, ...formState })
            setCurrentUser(user)
            goToNext(slideNumber)
        } catch (e) {
            setSubmissionError(e)
        }
    }

    const controls = [
        {
            type: "text",
            label: "Sex",
            placeholder: "male",
            pattern: /.*/,
            errorMessage: "",
            keyName: "sex",
            required: false
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
                    submissionError={submissionError}
                />
            </Container>
        </View >
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

export default OnboardingSex