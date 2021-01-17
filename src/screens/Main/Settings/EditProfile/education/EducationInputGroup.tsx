import { parse } from "@babel/core";
import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import EducationInput from "./EducationInput";

const WorkInputGroup = (props) => {

  const { allEducation, education, setEducation, index, key } = props

  const [formState, setFormState] = useState(education);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const onBlur = () => {
    let updatedEducation = [...allEducation]
    updatedEducation[index] = formState
    console.log("updatedEducation", updatedEducation)
    setEducation({ type: "UPDATE_EDUCATION", payload: updatedEducation })
    console.log("allEducation", allEducation)
  }

  console.log("allEducation on render", allEducation)

  const parseNumber = (value) => {
    if (value !== "") {
      return parseInt(value)
    }
  }

  return (
    <>
      <br /><br />
      <EducationInput setInput={(value) => setInput("name", value)} value={formState["name"]} onBlur={onBlur} />
      <EducationInput setInput={(value) => setInput("entryYear", parseNumber(value))} value={formState["entryYear"]} onBlur={onBlur} />
      <EducationInput setInput={(value) => setInput("graduationYear", parseNumber(value))} value={formState["graduationYear"]} onBlur={onBlur} />
      <EducationInput setInput={(value) => setInput("focus", value)} value={formState["focus"]} onBlur={onBlur} />
      <EducationInput setInput={(value) => setInput("degree", value)} value={formState["degree"]} onBlur={onBlur} />
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
