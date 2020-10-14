import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation, useLazyQuery, gql, useApolloClient } from "@apollo/client";
import Amplfiy, { Auth } from "aws-amplify";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";

const LaunchScreen = (props) => {
  const [store, setStore] = React.useContext(StoreContext);
  const [formState, setFormState] = useState({});
  const client = useApolloClient()

  const authManager = new EZAuthManager();

  const [authSession, setAuthSession] = useState("No auth session")

  useEffect(() => {
    authManager.checkForAuthSession(
      async (authSession) => {
        if (authSession != null) {
          console.log(`Auth Session found: ${JSON.stringify(authSession)}. Fetching user...`)
          setAuthSession(JSON.stringify(authSession))

          const result = await client.query({
            query: GET_USER,
            variables: { id: authSession.userId }
          });

          const user = result.data.user;
          setStore({ ...store, user });
          props.navigation.navigate("LocalUsers");
        } else {
          console.log(`No auth session stored in cache`)
          props.navigation.navigate("Login");
        }
      },
      (error) => {
        console.log(`An error occured while checking for auth session: ${error}`);
      }
    );
  }, []);

  return (
    <>
      <div>LAUNCH SCREEN</div>
      <div>Auth Session: {authSession}</div>
    </>
  );
};

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      sex
      age
      isVisible
      email
    }
  }
`;

export default LaunchScreen;
