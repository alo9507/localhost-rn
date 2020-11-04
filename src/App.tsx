import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import config from "../aws-exports";
import { registerRootComponent } from "expo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StoreProvider from "./store/StoreProvider";

import Amplfiy from "aws-amplify";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// screens
import Launch from "./screens/Launch";
import FirstLaunch from "./screens/FirstLaunch";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import LocalUsers from "./screens/LocalUsers";

Amplfiy.configure(config);

const Stack = createStackNavigator();
const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Launch">
          <Stack.Screen
            name="Launch"
            component={Launch}
            options={{ title: "Launch" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Sign In/Sign Up" }}
          />
          <Stack.Screen
            name="LocalUsers"
            component={LocalUsers}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Become a Member" }}
          />
          <Stack.Screen
            name="FirstLaunch"
            component={FirstLaunch}
            options={{ title: "First Launch Screen" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

registerRootComponent(App);
