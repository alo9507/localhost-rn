import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import styled from "styled-components/native";
import useEditProfileInput from "./hooks/useEditProfileInput";

const Age = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [age, bindAge, resetAge] = useEditProfileInput(editProfileState[keyName])

    return (
        <>
            <Text>Age: {age}</Text>
            <View>
                <Input
                    {...bindAge}
                    onBlur={() => updateEditProfileState({ [keyName]: parseInt(age) })}
                />
            </View>
        </>
    );
};

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export default Age;
