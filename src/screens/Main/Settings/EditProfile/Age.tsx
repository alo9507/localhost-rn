import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import styled from "styled-components/native";
import useEditProfileInput from "./hooks/useEditProfileInput";
import EditProfileVisibleToggle from "./components/VisibleToggle"

const Age = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [age, bindAge, resetAge] = useEditProfileInput(editProfileState[keyName])

    const toggleVisible = () => {
        console.log("toggled")
    }

    return (
        <>
            <Text>Age: {age}</Text>
            <View>
                <Text>Age can only be changed once.</Text>
                <Input
                    {...bindAge}
                    onBlur={() => updateEditProfileState({ [keyName]: parseInt(age) })}
                />
                <EditProfileVisibleToggle toggleSwitch={() => toggleVisible()} />
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
