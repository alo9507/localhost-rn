import React, { useReducer } from "react"
import styled from "styled-components/native";

const OnboardingTextInput = ({
    label,
    placeholder,
    pattern,
    errorMessage,
    setInput,
    formState,
    keyName,
    inputValid,
    inputInvalid }) => {

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'INVALID':
                    return {
                        ...prevState,
                        valid: false,
                        error: action.payload,
                    };
                case 'VALID':
                    return {
                        ...prevState,
                        valid: true,
                        error: null
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
        if (error.length !== 0) {
            dispatch({ type: "INVALID", payload: error })
            inputInvalid()
        } else {
            dispatch({ type: "VALID" })
            inputValid()
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

        const error = validation(val)
        if (error.length === 0) {
            dispatch({ type: "VALID" })
            inputValid()
        } else {
            dispatch({ type: "INVALID" })
            inputInvalid()
        }

        if (state.touched) {
            if (val === "") {
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
                return { borderColor: "#4D58A7", color: "#4D58A7" }

            // dirty
            case "1000":
                return { borderColor: "#9A3548", color: "#9A3548" }

            // dirty + focused
            case "1100":
                return { borderColor: "#101E80", color: "#101E80" }

            // dirty + focused + set
            case "1110":
                return { borderColor: "#101643", color: "#101643" }

            // dirty + focused + set + valid
            case "1111":
                return { borderColor: "#35773F", color: "#35773F" }

            // dirty + unfocused + set + invalid
            case "1010":
                return { borderColor: "#9A3548", color: "#9A3548" }

            // dirty + unfocused + set + valid
            case "1011":
                return { borderColor: "#6DA576", color: "#6DA576" }

            default:
                console.log("ERROR: No behavior configured for input state: ", inputState)
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

    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <Input
                onChangeText={(val) => handleTextChange(val)}
                onBlur={() => handleOnBlur()}
                onFocus={() => handleOnFocus()}
                value={formState[keyName]}
                placeholder={placeholder}
                placeholderTextColor={determineStyle(state).color}
                style={determineStyle(state)}
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

const InputContainer = styled.View`
    
`

const Input = styled.TextInput`
  height: 50px;
  width: 300px;
  background-color: #FFFACC;
  margin-bottom: 10px;
  padding: 8px;
  color: #4D58A7;
  font-weight: bold;
  border-width: 5px;
  border-radius: 40px;
`;

const InputLabel = styled.Text`
    color: #4D58A7;
    font-weight: bold;
    margin-bottom: 5px;
`

const Error = styled.View`
    paddingLeft: 0px;
`

const ErrorMessage = styled.Text`
    color: #9A3548;
    fontSize: 15px;
`

export default OnboardingTextInput