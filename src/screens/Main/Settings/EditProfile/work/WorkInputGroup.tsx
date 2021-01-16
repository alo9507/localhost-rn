import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import WorkInput from "./WorkInput";

const WorkInputGroup = (props) => {

  const { workExperience } = props

  console.log("workExperience in input group", workExperience)

  return (
    <>
      <br /><br />
      <WorkInput data={workExperience.organizationName} />
      <WorkInput data={workExperience.title} />
      <WorkInput data={workExperience.startYear} />
      <WorkInput data={workExperience.endYear} />
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
