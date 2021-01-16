import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const WorkInput = (props) => {

  const { data } = props
  const [inputState, setInputState] = useState(data);

  return (
    <Input
      value={inputState}
      onChangeText={(e) => setInputState(e.target.value)}
    />
  )
};

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

export default WorkInput;
