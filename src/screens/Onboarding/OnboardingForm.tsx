import React, { useContext, useState, useReducer } from "react"
import { View, Button, ActivityIndicator } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";
import OnboardingTextInput from "./OnboardingTextInput";

const OnboardingForm = ({ formState, setFormState, controls, onSubmit, submissionError }) => {
    const [appState, setAppState] = useContext(StoreContext);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOADING':
                    return {
                        ...prevState,
                        loading: true,
                        errors: [],
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
                        formValid: false
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            loading: false,
            errors: null,
            formErrors: [],
            formValid: false
        }
    );

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    function confgiureControl(control) {
        switch (control.type) {
            case "text":
                return <OnboardingTextInput
                    label={control.label}
                    placeholder={control.placeholder}
                    pattern={control.pattern}
                    errorMessage={control.errorMessage}
                    setInput={setInput}
                    formState={formState}
                    keyName={control.keyName}
                    inputValid={() => dispatch({ type: "INPUT_VALID", payload: control.keyName })}
                    inputInvalid={() => dispatch({ type: "INPUT_INVALID", payload: control.keyName })}
                    required={control.required}
                    key={control.keyName}
                    submissionError={submissionError}
                />
        }
    }

    return (
        <Container>
            {controls.map((control, index) => {
                return confgiureControl(control)
            })}
            <SubmitButton disabled={state.formErrors?.length !== 0} title="Next" onPress={onSubmit} />
            {state.loading && <ActivityIndicator size="large" />}
        </Container>
    )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const SubmitButton = styled.Button`
    background: gray;
`

export default OnboardingForm