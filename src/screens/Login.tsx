import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../data/StoreContext";
import styled from "styled-components/native";

const Login = (props) => {
  const initialState = { email: "", password: "" };

  const [formState, setFormState] = useState(initialState);
  const [state, setState] = React.useContext(StoreContext);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    try {
      const signUpResult = await Auth.signUp({
        username: formState.email,
        password: formState.password,
      });

      const userId = signUpResult.userSub;

      const newUser = {
        id: userId,
      };

      await API.graphql(
        graphqlOperation(createUser, { input: { ...newUser } })
      );

      setState({ ...state, user: newUser.id });

      props.navigation.navigate("LocalUsers");
    } catch (error) {
      console.log("Error signing up:", error);
    }
  }

  async function signIn() {
    try {
      const { user } = await Auth.signIn({
        username: formState.email,
        password: formState.password,
      });
      console.log(Auth.currentAuthenticatedUser());
      console.log(Auth.currentSession());
      console.log(Auth.currentUserInfo());
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <>
      <Container>
        <Input
          onChangeText={(val) => setInput("email", val)}
          value={formState.email}
          placeholder="Email"
        />
        <Input
          onChangeText={(val) => setInput("password", val)}
          value={formState.password}
          placeholder="Password"
        />
        <Button title="Sign Up" onPress={signUp} />
      </Container>

      <Container>
        <Input
          onChangeText={(val) => setInput("email", val)}
          value={formState.email}
          placeholder="Email"
        />
        <Input
          onChangeText={(val) => setInput("password", val)}
          value={formState.password}
          placeholder="Password"
        />
        <Button title="Sign In" onPress={signIn} />
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

export default Login;
