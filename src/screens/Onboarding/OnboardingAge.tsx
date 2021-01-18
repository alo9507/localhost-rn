import React, { useContext, useState } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"
import OnboardingForm from "./OnboardingForm"
import useCurrentUser from "../../hooks/useCurrentUser";

const OnboardingName = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ age: "25" });
    const [currentUser, setCurrentUser] = useCurrentUser()

    const [submissionError, setSubmissionError] = useState(null);

    async function submitAndGoToNext() {
        try {
            const age = parseInt(formState.age)
            const user = await appState.userRepository.updateUser({ id: currentUser.id, age, profileImageUrl: "https://randomuser.me/portraits/men/75.jpg" })
            setCurrentUser(user)
            goToNext(slideNumber)
        } catch (e) {
            setSubmissionError(e)
        }
    }

    const controls = [
        {
            type: "text",
            label: "Age",
            placeholder: "25",
            pattern: /.*/,
            errorMessage: "",
            keyName: "age",
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

export default OnboardingName