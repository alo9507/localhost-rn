import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInput from "./WorkInput";

const WorkInputGroup = (props) => {

  const { workExperience } = props

  const [formState, setFormState] = useState(workExperience);

  console.log("formState", formState)

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const onBlur = () => {

  }

  return (
    <>
      <br /><br />
      <WorkInput data={workExperience.organizationName} keyName={"organizationName"} setInput={setInput} onBlur={() => onBlur()} />
      <WorkInput data={workExperience.title} keyName={"title"} setInput={setInput} onBlur={() => onBlur()} />
      <WorkInput data={workExperience.startYear} keyName={"startYear"} setInput={setInput} onBlur={() => onBlur()} />
      <WorkInput data={workExperience.endYear} keyName={"endYear"} setInput={setInput} onBlur={() => onBlur()} />
      <br /><br /><br /><br />
    </>
  )
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

export default WorkInputGroup;
