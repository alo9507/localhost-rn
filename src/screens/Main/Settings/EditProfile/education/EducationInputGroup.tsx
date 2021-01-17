import { parse } from "@babel/core";
import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";
import EducationInput from "./EducationInput";
import EducationContext from "./store/EducationContext";

const EducationInputGroup = ({ index, educationObject }) => {
  const [education, setEducation] = useContext(EducationContext)

  const [formState, setFormState] = useState(educationObject);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const onBlur = () => {
    let updatedEducation = [...education]
    updatedEducation[index] = formState
    console.log(updatedEducation)
    setEducation({ type: "UPDATE_EDUCATION", payload: updatedEducation })
  }

  const parseNumber = (value) => {
    if (value !== "") {
      return parseInt(value)
    }
  }

  const removeEducationExperience = () => {
    let updatedEducation = [...education]
    console.log(index)
    updatedEducation.splice(index, 1)
    setEducation({ type: "UPDATE_EDUCATION", payload: updatedEducation })
  }

  useEffect(() => {
    setFormState(educationObject)
  }, [educationObject])

  return (
    <>
      <br /><br />
      <Button title="Remove" onPress={() => removeEducationExperience()} />
      <EducationInput label={"School Name"} setInput={(value) => setInput("name", value)} value={formState["name"]} onBlur={onBlur} />
      <EducationInput label={"Focus"} setInput={(value) => setInput("focus", value)} value={formState["focus"]} onBlur={onBlur} />
      <EducationInput label={"Degree"} setInput={(value) => setInput("degree", value)} value={formState["degree"]} onBlur={onBlur} />
      <EducationInput label={"Entry Year"} setInput={(value) => setInput("entryYear", parseNumber(value))} value={formState["entryYear"]} onBlur={onBlur} />
      <EducationInput label={"Graduation Year"} setInput={(value) => setInput("graduationYear", parseNumber(value))} value={formState["graduationYear"]} onBlur={onBlur} />
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

export default EducationInputGroup;
