import React, { useState, useReducer } from "react"
import { Text } from "react-native";
import styled from "styled-components/native";

const OnboardingTextInput = ({ label, pattern, errorMessage, formState, setInput, placeholder, keyName }) => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'INVALID':
                    return {
                        ...prevState,
                        error: action.payload,
                        valid: false,
                    };
                case 'VALID':
                    return {
                        ...prevState,
                        valid: true,
                    };
                case 'FOCUSED':
                    return {
                        ...prevState,
                        focused: true,
                    };
                case 'UNFOCUSED':
                    return {
                        ...prevState,
                        focused: false,
                    };
                case 'TOUCHED':
                    return {
                        ...prevState,
                        touched: true,
                    };
                case 'SET':
                    return {
                        ...prevState,
                        set: true,
                    };
                case 'UNSET':
                    return {
                        ...prevState,
                        set: false,
                    };
                default:
                    throw new Error(`UNKNOWN ACTION: ${action.type}`)
            }
        },
        {
            touched: false,
            focused: false,
            set: false,
            valid: false,
            error: null,
        }
    );

    function validate() {
        let error: string = validation(formState[keyName])
        if (error.length != 0) {
            dispatch({ type: "INVALID", payload: error })
        } else {
            dispatch({ type: "VALID" })
        }
    }

    function validation(value): string {
        let error: string = ""
        if (!pattern.test(value)) {
            error = errorMessage
        }
        return error
    }


    const handleTextChange = (val) => {
        setInput(keyName, val)

        const errors = validation(val)
        if (errors.length == 0) {
            dispatch({ type: "VALID" })
        }

        if (state.touched) {
            if (val === "") {
                console.log("unset")
                dispatch({ type: "UNSET" })
            } else {
                dispatch({ type: "SET" })
            }
        }
    }

    const handleOnBlur = () => {
        validate()
        dispatch({ type: "UNFOCUSED" })
    }

    const handleOnFocus = () => {
        dispatch({ type: "TOUCHED" })
        dispatch({ type: "FOCUSED" })
    }

    const determineStyle = (inputState) => {
        switch (bitMask(inputState)) {
            // totally fresh
            case "0000":
                return { borderColor: "#4D58A7" }
            // dirty
            case "1000":
                return { borderColor: "purple" }
            // dirty + focused
            case "1100":
                return { borderColor: "black" }

            // dirty + focused + set
            case "1110":
                return { borderColor: "yellow" }

            // dirty + focused + set + valid
            case "1111":
                return { borderColor: "green" }

            // dirty + focused + set + valid
            case "1111":
                return { borderColor: "green" }

            default:
                console.log("ERROR", inputState)
        }
    }

    const bitMask = (inputState): string => {
        let mask = ""
        mask += inputState.touched ? "1" : "0"
        mask += inputState.focused ? "1" : "0"
        mask += inputState.set ? "1" : "0"
        mask += inputState.valid ? "1" : "0"
        return mask
    }

    const borderColor = determineStyle(state)

    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <Input
                onChangeText={(val) => handleTextChange(val)}
                onBlur={() => handleOnBlur()}
                onFocus={() => handleOnFocus()}
                value={formState[keyName]}
                placeholder={placeholder}
                placeholderTextColor={"#4D58A7"}
                style={borderColor}
            />
            {state.error &&
                <Error>
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