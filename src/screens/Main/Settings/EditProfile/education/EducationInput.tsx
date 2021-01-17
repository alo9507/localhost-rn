import React from "react";
import { Text } from "react-native"
import styled from "styled-components/native";

const EducationInput = ({ setInput, value, onBlur, label }) => {

  return (
    <>
      <Text>{label}</Text>
      <Input
        value={value}
        onChangeText={(value) => setInput(value)}
        onBlur={() => onBlur()}
      />
    </>
  )
};

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

export default EducationInput;
