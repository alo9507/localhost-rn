import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation, useLazyQuery, gql } from "@apollo/client";
import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";

const LaunchScreen = (props) => {
  const [store, setStore] = React.useContext(StoreContext);
  const [formState, setFormState] = useState({});

  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER, {
    onCompleted: data => {
      // props.navigation.navigate("LocalUsers");
    }
  });

  const authManager = new EZAuthManager();

  const [authSession, setAuthSession] = useState("No auth session")

  useEffect(() => {
    authManager.checkForAuthSession(
      (authSession) => {
        if (authSession != null) {
          console.log(`Auth Session found: ${authSession}. Fetching user...`)
          setAuthSession(JSON.stringify(authSession))
          getUser({ variables: { id: authSession.userId } })
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

  if (loading) return <p>Loading ...</p>;
  if (error) return <div>{JSON.stringify(error)}</div>;

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
    }
  }
`;

export default LaunchScreen;
