import React, { useState, useReducer } from "react"
import { Text } from "react-native";
import styled from "styled-components/native";

const OnboardingTextInput = ({ label, pattern, errorMessage, formState, setInput, placeholder, keyName }) => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'INPUT_VALID':
                    return {
                        error: null,
                        inputValid: true,
                        borderColor: "#4D58A7"
                    };
                case 'INPUT_INVALID':
                    return {
                        error: action.payload,
                        inputValid: false,
                        borderColor: "red"
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            error: null,
            inputValid: false,
            borderColor: "#4D58A7"
        }
    );

    function validate() {
        console.log(formState[keyName])
        let error: string = validation(formState[keyName])
        if (error.length != 0) {
            dispatch({ type: "INPUT_INVALID", payload: error })
        } else {
            dispatch({ type: "INPUT_VALID" })
        }
    }

    function validation(value): string {
        let error: string = ""
        if (!pattern.test(value)) {
            error = errorMessage
        }
        return error
    }

    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <Input
                onChangeText={(val) => setInput(keyName, val)}
                value={formState[keyName]}
                placeholder={placeholder}
                onBlur={() => validate()}
                onFocus={() => dispatch({ type: "INPUT_VALID" })}
                placeholderTextColor={"#4D58A7"}
                style={{ borderColor: state.borderColor }}
            />
            {state.error &&
                <Error >
                    <ErrorMessage>
                        {state.error}
                    </ErrorMessage>
                </Error>
            }
        </InputContainer>
    )
}

const Input = styled.TextInput`
  height: 50px;
  width: 300px;
  background-color: #FFFACC;
  margin-bottom: 10px;
  padding: 8px;
  color: #4D58A7;
  font-weight: bold;
  border: 5px solid #4D58A7;
  border-radius: 40px;
`;

const InputLabel = styled.Text`
    color: #4D58A7;
    font-weight: bold;
    margin-bottom: 5px;
`

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

const InputContainer = styled.View`
    
`

export default OnboardingTextInput