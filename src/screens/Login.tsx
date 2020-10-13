import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import Amplfiy, { Auth } from "aws-amplify";
import { User } from "../models/types";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";

const Login = (props) => {
  const [store, setStore] = React.useContext(StoreContext);
  const [formState, setFormState] = useState({});

  const [getUser, { loading, data }] = useLazyQuery(GET_USER);
  const [createUser] = useMutation(CREATE_USER);

  const authManager = new EZAuthManager();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    console.log("signing up")
    authManager.signUp(
      formState.email,
      formState.password,
      async (authSession) => {
        const result = await createUser({
          variables: { id: authSession.userId },
        });
        console.log("result", result)
        const user = result.data.createUser;
        setStore({ ...store, user });
        console.log("user", user)
        console.log("store", store)
        props.navigation.navigate("SignUp");
      },
      async (error) => {
        console.log("Error signing up:", error);
      })
  }

  async function signIn() {
    try {
      authManager.signIn(
        formState.email,
        formState.password,
        async (authSession) => {
          const result = await getUser({
            variables: { id: authSession.userId },
          });

          const user = result.data.GetUser;

          setStore({ ...store, user });

          props.navigation.navigate("LocalUsers");
        },
        async (error) => {
          console.log(error);
        }
      );
    } catch (error) {
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
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($id: ID!) {
    createUser(input: { id: $id }) {
      id
    }
  }
`;

export default Login;
