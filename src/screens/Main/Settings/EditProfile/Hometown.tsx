import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import useEditProfileInput from "./hooks/useEditProfileInput";

const Hometown = (props) => {
    const { updateEditProfileState, keyName, editProfileState } = props.route.params
    const [hometown, bindHometown, resetHometown] = useEditProfileInput(editProfileState[keyName])

    return (
        <>
            <Text>Hometown: {hometown}</Text>
            <View>
                <Input
                    {...bindHometown}
                    onBlur={() => updateEditProfileState({ [keyName]: hometown })}
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

export default Hometown;
