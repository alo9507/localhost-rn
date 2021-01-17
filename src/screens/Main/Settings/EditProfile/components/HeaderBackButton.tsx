import React, { useState, useLayoutEffect } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import WorkInputGroup from "./WorkInputGroup";

const HeaderBackButton = (props) => {

  return (
    <>
      <Button title="Back" onPress={() => props.goBack()} />
    </>
  );
};

// organizationName: String
// startYear: Int
// endYear: Int
// title: String

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

export default HeaderBackButton;
