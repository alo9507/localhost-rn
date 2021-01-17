import { parse } from "@babel/core";
import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInput from "./WorkInput";
import WorkContext from "./store/WorkContext"

const WorkInputGroup = (props) => {
  const [workExperience, setWorkExperience] = useContext(WorkContext)

  const { workExperienceObject, index } = props

  const [formState, setFormState] = useState(workExperienceObject);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const onBlur = () => {
    let updatedWorkExperience = [...workExperience]
    updatedWorkExperience[index] = formState
    setWorkExperience({ type: "UPDATE_WORK_EXPERIENCE", payload: updatedWorkExperience })
  }

  const parseNumber = (value) => {
    if (value !== "") {
      return parseInt(value)
    }
  }

  return (
    <>
      <br /><br />
      <WorkInput setInput={(value) => setInput("organizationName", value)} value={formState["organizationName"]} onBlur={onBlur} />
      <WorkInput setInput={(value) => setInput("title", value)} value={formState["title"]} onBlur={onBlur} />
      <WorkInput setInput={(value) => setInput("startYear", parseNumber(value))} value={formState["startYear"]} onBlur={onBlur} />
      <WorkInput setInput={(value) => setInput("endYear", parseNumber(value))} value={formState["endYear"]} onBlur={onBlur} />
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
