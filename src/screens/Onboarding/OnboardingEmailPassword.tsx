import React, { useContext, useState, useReducer } from "react"
import { View, Button, ActivityIndicator } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";

const OnboardingEmailPassword = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);

    type LoginInitialState = {
        email: string,
        password: string,
    }

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOADING':
                    return {
                        loading: true,
                        error: null,
                        inputValid: false,
                        emailTouched: false
                    };
                case 'ERROR':
                    return {
                        loading: false,
                        error: action.payload.replace(/['"]+/g, ''),
                        inputValid: false,
                        emailTouched: false
                    };
                case 'INPUT_VALID':
                    return {
                        error: null,
                        loading: false,
                        inputValid: true,
                        emailTouched: true
                    };
                case 'INPUT_INVALID':
                    return {
                        error: action.payload,
                        loading: false,
                        inputValid: false,
                        emailTouched: true
                    };
                case 'EMAIL_TOUCHED':
                    return {
                        ...prevState,
                        emailTouched: true
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            loading: false,
            error: null,
            inputValid: false,
            emailTouched: false
        }
    );

    const initial: LoginInitialState = {
        email: "",
        password: ""
    }

    const [formState, setFormState] = useState(initial);
    function setEmail(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    function emailTouchedAndValidate() {
        dispatch({ type: "EMAIL_TOUCHED" })
        let error: string = emailValidation(formState.email)
        if (error.length != 0) {
            dispatch({ type: "INPUT_INVALID", payload: error })
        } else {
            dispatch({ type: "INPUT_VALID" })
        }
    }

    function emailValidation(value): string {
        let error: string = ""
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailPattern.test(value)) {
            error = 'Enter a valid email';
        }
        return error
    }

    function setPassword(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function submitAndGoToNext() {
        dispatch({ type: "LOADING" })

        try {
            const authSession = await appState.authManager.signUp(formState.email, formState.password)
            const user = await appState.userRepository.createUser(authSession.userId, formState.email)
            setAppState({ type: "UPDATE_USER", payload: user })
            goToNext(slideNumber)
        } catch (e) {
            dispatch({ type: "ERROR", payload: JSON.stringify(e) })
        }
    }

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                {state.error &&
                    <Error >
                        <ErrorMessage>
                            {state.error}
                        </ErrorMessage>
                    </Error>
                }
                <Input
                    onChangeText={(val) => setEmail("email", val)}
                    value={formState.email}
                    placeholder="Email"
                    onBlur={() => emailTouchedAndValidate()}
                    onFocus={() => dispatch({ type: "INPUT_VALID" })}
                    enterKeyHint={""}
                />
                <Input
                    onChangeText={(val) => setPassword("password", val)}
                    value={formState.password}
                    placeholder="Password"
                    enterKeyHint={""}
                />
                <NextButton disabled={!state.inputValid} title="Next" onPress={submitAndGoToNext} />
                {state.loading && <ActivityIndicator size="large" />}
            </Container>
        </View>
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

const Error = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
    paddingLeft: 0px;
`

const ErrorMessage = styled.Text`
    color: red;
    fontSize: 15px;
`

const NextButton = styled.Button`
    background: gray;
`

export default OnboardingEmailPassword