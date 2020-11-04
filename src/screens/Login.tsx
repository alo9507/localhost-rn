import React, { useState } from "react";
import { Button } from "react-native";
import { useMutation, useLazyQuery, useApolloClient, gql } from "@apollo/client";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import { loadingBar } from "aws-amplify";

const Login = (props) => {
  const [appState, setAppState] = React.useContext(StoreContext);

  type LoginInitialState = {
    email: string,
    password: string,
  }

  const initial: LoginInitialState = {
    email: "",
    password: ""
  }

  const [formState, setFormState] = useState(initial);

  const authManager = new EZAuthManager();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    try {
      const authSession = await authManager.signUp(formState.email, formState.password)
      const user = await appState.userRepository.createUser(authSession.userId, formState.email)
      setAppState({ ...appState, user });
      props.navigation.navigate("SignUp");
    } catch (e) {
      console.log("Error signing up:", e);
    }
  }

  async function signIn() {
    try {
      const authSession = await authManager.signIn(formState.email, formState.password)
      const user = await appState.userRepository.getUser(authSession.userId)
      setAppState({ ...appState, user });
      props.navigation.navigate("LocalUsers");
      async (error) => {
        console.log(error);
      }
    } catch (error) {
      console.log(error)
      console.log("Error Signing In:", error);
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
