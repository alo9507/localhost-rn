import React, { useReducer, useContext, useEffect } from "react"
import styled from "styled-components/native";
import StyleContext from "../../store/StyleContext"

const OnboardingTextInput = ({
    label,
    placeholder,
    pattern,
    errorMessage,
    setInput,
    formState,
    keyName,
    inputValid,
    inputInvalid,
    required
}) => {

    const { color } = useContext(StyleContext);

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
        const value = formState[keyName]

        if (value !== "") {
            if (pattern.test(value)) {
                dispatch({ type: "VALID" })
                inputValid()
            } else {
                dispatch({ type: "INVALID", payload: errorMessage })
                inputInvalid()
            }
        }
    }

    const handleTextChange = (value) => {
        setInput(keyName, value)

        if (pattern.test(value)) {
            dispatch({ type: "VALID" })
            inputValid()
        } else {
            dispatch({ type: "INVALID" })
            inputInvalid()
        }

        if (state.touched) {
            if (value === "") {
                dispatch({ type: "UNSET" })
                if (!required) {
                    inputValid()
                }
            } else {
                dispatch({ type: "SET" })
            }
        }
    }

    useEffect(() => {
        if (required) {
            inputInvalid()
        }
    }, [])

    const handleOnBlur = () => {
        validate()
        dispatch({ type: "UNFOCUSED" })
    }

    const handleOnFocus = () => {
        dispatch({ type: "TOUCHED" })
        dispatch({ type: "FOCUSED" })
    }

    const determineStyle = (inputState) => {
        console.log(inputState)
        switch (bitMask(inputState)) {
            // totally fresh
            case "0000":
                return { borderColor: color.primaryText, color: color.primaryText }

            // touched
            case "1000":
                return { borderColor: color.primaryText_darker, color: color.primaryText_darker }

            // touched + focused
            case "1100":
                return { borderColor: color.primaryText_darkest, color: color.primaryText_darkest }

            // touched + focused + set
            case "1110":
                return { borderColor: color.primaryText_darkest, color: color.primaryText_darkest }

            // touched + focused + set + valid
            case "1111":
                return { borderColor: color.good_dark, color: color.good_dark }

            // touched + unfocused + set + invalid
            case "1010":
                return { borderColor: color.error_dark, color: color.error_dark }

            // touched + unfocused + set + valid
            case "1011":
                return { borderColor: color.good_light, color: color.good_light }

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

    const style = determineStyle(state)

    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            <Input
                onChangeText={(val) => handleTextChange(val)}
                onBlur={() => handleOnBlur()}
                onFocus={() => handleOnFocus()}
                value={formState[keyName]}
                placeholder={placeholder}
                placeholderTextColor={style.color}
                style={style}
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