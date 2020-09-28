import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

const SignUp = (props) => {
  const initialState = {
    name: "",
    bio: "",
    whatAmIDoing: "",
    sex: "",
    age: 25,
    location: "0",
    isVisible: true,
  };

  const [formState, setFormState] = useState(initialState);
  const [state, setState] = React.useContext(StoreContext);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const join = async () => {
    const user = { ...formState, id: state.userId };
    try {
      const updatedUser = await API.graphql(
        graphqlOperation(updateUser, { input: user })
      );
      console.log(updatedUser);
    } catch (e) {
      console.log(`Error signing up new user:`, e);
    }
  };

  useEffect(() => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 2000,
    };
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  const geoSuccess = (location) => {
    console.log(location);
    setInput(
      "location",
      `${location.coords.latitude} : ${location.coords.longitude}`
    );
  };

  const geoFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container>
        <Input
          onChangeText={(val) => setInput("name", val)}
          value={formState.name}
          placeholder="Name"
        />
        <Input
          onChangeText={(val) => setInput("sex", val)}
          value={formState.sex}
          placeholder="Sex"
        />
        <Input
          onChangeText={(val) => setInput("age", val)}
          value={formState.age}
          placeholder="Age"
        />
        <Input
          onChangeText={(val) => setInput("whatAmIDoing", val)}
          value={formState.whatAmIDoing}
          placeholder="What Am I doing"
        />
        <Input
          onChangeText={(val) => setInput("bio", val)}
          value={formState.bio}
          placeholder="bio"
        />
        <Input
          onChangeText={(val) => setInput("location", val)}
          value={formState.location}
          placeholder="Fetching Location..."
        />
        <Button title="Sign Up" onPress={join} />
      </Container>
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

export default SignUp;
