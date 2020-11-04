import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation, useLazyQuery, gql, useApolloClient } from "@apollo/client";
import Amplfiy, { Auth } from "aws-amplify";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";
import AuthSession from "../service/authentication/AuthSession/AuthSession"
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import AsyncStorageFirstLaunchService from "../service/first-launch-service/AsyncStorageFirstLaunchService"

const LaunchScreen = (props) => {
  const [store, setStore] = React.useContext(StoreContext);
  const client = useApolloClient()

  const authManager = new EZAuthManager();

  const [authSession, setAuthSession] = useState("No auth session")

  const determineFirstLaunch = async () => {
    const fls = new AsyncStorageFirstLaunchService()
    const isFirstLaunch = await fls.isFirstLaunch()
    console.log("IS FIRST LAUNCH RETURNED: ", isFirstLaunch)
    return isFirstLaunch
  }

  const determineIsLoggedIn = async () => {
    const authSession: AuthSession | null = await authManager.checkForAuthSession()
    if (authSession != null) {
      console.log(`Auth Session found: ${JSON.stringify(authSession)}. Fetching user...`)
      setAuthSession(JSON.stringify(authSession))

      const result = await client.query({
        query: GET_USER,
        variables: { id: authSession.userId }
      });

      const user = result.data.user;
      setStore({ ...store, user });
      return true
    } else {
      console.log(`No auth session stored in cache`)
      return false
    }
  }

  useEffect(() => {
    (async function determineFirstScreen() {
      try {
        const isFirstLaunch = await determineFirstLaunch()

        if (isFirstLaunch) {
          return props.navigation.navigate("FirstLaunch");
        }

        const isLoggedIn = await determineIsLoggedIn()
        if (isLoggedIn) {
          return props.navigation.navigate("LocalUsers");
        } else {
          return props.navigation.navigate("Login");
        }
      } catch (e) {
        console.log(`An error occured while determining first screen: ${e}`);
      }
    })();
  }, []);

  return (
    <>
      <Text>LAUNCH SCREEN</Text>
      <Text>Auth Session: {authSession}</Text>
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
