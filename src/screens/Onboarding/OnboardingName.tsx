import React, { useContext, useState } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"
import OnboardingForm from "./OnboardingForm"
import useCurrentUser from "../../hooks/useCurrentUser";

const OnboardingName = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);
    const [formState, setFormState] = useState({ firstname: "", lastname: "" });
    const [currentUser, setCurrentUser] = useCurrentUser()

    async function submitAndGoToNext() {
        try {
            const user = await ({ id: currentUser.id, ...formState })
            setCurrentUser(user)
            goToNext(slideNumber)
        } catch (e) {
            console.log(e)
        }
    }

    const firstNameErrorMessage = `
    Must contain:
    - At least 8 characters
    - One number
    `

    const lastNameErrorMessage = `
    Please enter a valid email address:
    - example@g.com
    `

    const controls = [
        {
            type: "text",
            label: "First Name",
            placeholder: "Andrew",
            pattern: /.*/,
            errorMessage: firstNameErrorMessage,
            keyName: "firstname",
            required: true
        },
        {
            type: "text",
            label: "Last Name",
            placeholder: "O'Brien",
            pattern: /.*/,
            errorMessage: lastNameErrorMessage,
            keyName: "lastname",
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