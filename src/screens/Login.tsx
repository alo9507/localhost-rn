import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";

const Login = (props) => {
  const initialState = { email: "", password: "" };
  const [formState, setFormState] = useState(initialState);
  const [state, setState] = React.useContext(StoreContext);

  const authManager = new EZAuthManager();

  useEffect(() => {
    authManager.checkForAuthSession(
      (authSession) => {
        if (authSession != null) {
          props.navigation.navigate("LocalUsers");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    try {
      const signUpResult = await Auth.signUp({
        username: formState.email,
        password: formState.password,
      });

      const newUser = {
        id: userId,
      };

      await API.graphql(
        graphqlOperation(createUser, { input: { ...newUser } })
      );

      const userId = signUpResult.userSub;

      const user = await API.graphql(
        graphqlOperation(getUser, { input: { id: userId } })
      );

      setState({ ...state, user });

      props.navigation.navigate("SignUp");
    } catch (error) {
      console.log("Error signing up:", error);
    }
  }

  async function signIn() {
    try {
      authManager.signIn(
        formState.email,
        formState.password,
        async (authSession) => {
          const result = await API.graphql(
            graphqlOperation(getUser, { id: authSession.userId })
          );

          const user = result.data.getUser;

          setState({ ...state, user });

          props.navigation.navigate("LocalUsers");
        },
        async (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log("Error signing in:", error);
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
