import React, { useContext, useState, useReducer } from "react"
import { View, Button, ActivityIndicator } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingTextInput from "./OnboardingTextInput";

const OnboardingEmailPassword = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);

    type LoginInitialState = { email: string, password: string, }
    const initial: LoginInitialState = { email: "", password: "" }
    const [formState, setFormState] = useState(initial);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOADING':
                    return {
                        loading: true,
                        error: null,
                    };
                case 'ERROR':
                    return {
                        loading: false,
                        error: action.payload.replace(/['"]+/g, ''),
                    };
                case 'FORM_VALID':
                    return {
                        loading: false,
                        error: null,
                        formValid: true
                    };
                case 'FORM_INVALID':
                    return {
                        loading: false,
                        error: null,
                        formValid: false
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            loading: false,
            error: null,
            formValid: false
        }
    );

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function submitAndGoToNext() {
        try {
            dispatch({ type: "LOADING" })
            const authSession = await appState.authManager.signUp(formState.email, formState.password)
            const user = await appState.userRepository.createUser(authSession.userId, formState.email)
            setAppState({ type: "UPDATE_USER", payload: user })
            goToNext(slideNumber)
        } catch (e) {
            dispatch({ type: "ERROR", payload: JSON.stringify(e) })
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

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <OnboardingTextInput
                    pattern={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
                    errorMessage={emailErrorMessage}
                    formState={formState}
                    setInput={setInput}
                    keyName="email"
                    placeholder="email"
                    label="Email"
                />
                <OnboardingTextInput
                    pattern={/.{8,}$/}
                    errorMessage={passwordErrorMessage}
                    formState={formState}
                    setInput={setInput}
                    keyName="password"
                    placeholder="password"
                    label="Password"
                />
                <NextButton disabled={!state.formValid} title="Next" onPress={submitAndGoToNext} />
                {state.loading && <ActivityIndicator size="large" />}
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