import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../graphql/mutations";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

const SignUp = (props) => {
  const initialState = { name: "", bio: "", location: "0" };

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

  return (
    <>
      <Container>
        <Input
          onChangeText={(val) => setInput("name", val)}
          value={formState.name}
          placeholder="Name"
        />
        <Input
          onChangeText={(val) => setInput("bio", val)}
          value={formState.bio}
          placeholder="bio"
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
