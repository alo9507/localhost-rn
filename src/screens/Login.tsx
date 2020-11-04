import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation, useLazyQuery, useApolloClient, gql } from "@apollo/client";
import Amplfiy, { Auth } from "aws-amplify";
import User from "../models/User";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";

const Login = (props) => {
  const [state, setState] = React.useContext(StoreContext);

  type LoginInitialState = {
    email: string,
    password: string,
  }

  const initial: LoginInitialState = {
    email: "",
    password: ""
  }

  const [formState, setFormState] = useState(initial);

  const [getUser, { loading, data }] = useLazyQuery(GET_USER);
  const [createUser] = useMutation(CREATE_USER);
  const client = useApolloClient();

  const authManager = new EZAuthManager();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    try {
      const authSession = await authManager.signUp(formState.email, formState.password)
      const result = await createUser({
        variables: { id: authSession.userId, email: formState.email },
      });

      const user = result.data.createUser;
      setState({ ...state, user });
      props.navigation.navigate("SignUp");
    } catch (e) {
      console.log("Error signing up:", e);
    }
  }

  async function signIn() {
    try {
      const authSession = await authManager.signIn(formState.email, formState.password)
      console.log(authSession.userId)
      const result = await client.query({
        query: GET_USER,
        variables: { id: authSession.userId }
      });

      const user = result.data.user;
      setState({ ...state, user });
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

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($id: ID!, $email: String!) {
    createUser(input: { id: $id, email: $email }) {
      id
      email
    }
  }
`;

export default Login;
