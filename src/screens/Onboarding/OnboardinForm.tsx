import React, { useContext, useState, useReducer } from "react"
import { View, Button, ActivityIndicator } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingTextInput from "./OnboardingTextInput";

const OnboardingForm = ({ item, goToNext, slideNumber, children, initial, controls }) => {
    const [appState, setAppState] = useContext(StoreContext);

    const [formState, setFormState] = useState(initial);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOADING':
                    return {
                        ...prevState,
                        loading: true,
                        errors: [],
                        submissionError: null
                    };
                case 'SUBMISSION_ERROR':
                    return {
                        ...prevState,
                        loading: false,
                        submissionError: action.payload.replace(/['"]+/g, ''),
                    };
                case 'INPUT_VALID':
                    let formErrorsCloneValid = [...prevState.formErrors]
                    const index = formErrorsCloneValid.indexOf(action.payload)
                    if (index !== -1) {
                        formErrorsCloneValid.splice(index, 1)
                    }
                    return {
                        ...prevState,
                        loading: false,
                        formErrors: formErrorsCloneValid,
                        submissionError: null
                    };
                case 'INPUT_INVALID':
                    let formErrorsClone = [...prevState.formErrors]
                    if (!formErrorsClone.includes(action.payload)) {
                        formErrorsClone.push(action.payload)
                    }
                    return {
                        ...prevState,
                        loading: false,
                        formErrors: formErrorsClone,
                        submissionError: null,
                        formValid: false
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            loading: false,
            errors: null,
            submissionError: null,
            formErrors: [],
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
            dispatch({ type: "SUBMISSION_ERROR", payload: JSON.stringify(e) })
        }
    }

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>

                < NextButton disabled={state.formErrors?.length !== 0} title="Next" onPress={submitAndGoToNext} />
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

export default OnboardingForm