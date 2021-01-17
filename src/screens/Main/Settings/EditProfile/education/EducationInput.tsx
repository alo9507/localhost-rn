import React from "react";
import styled from "styled-components/native";

const EducationInput = ({ setInput, value, onBlur }) => {

  return (
    <Input
      value={value}
      onChangeText={(value) => setInput(value)}
      onBlur={() => onBlur()}
    />
  )
};

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

export default EducationInput;
