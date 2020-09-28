import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { API, graphqlOperation } from "aws-amplify";
import { createUser } from "./graphql/mutations";
import { listUsers } from "./graphql/queries";
import config from "../aws-exports";
import { registerRootComponent } from "expo";
import Login from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocalUsers from "./screens/LocalUsers";
import StoreProvider from "./store/StoreProvider";
import ThemeProvider from "./style/ThemeProvider";

Amplfiy.configure(config);

const Stack = createStackNavigator();

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Sign In/Sign Up" }}
          />
          <Stack.Screen
            name="LocalUsers"
            component={LocalUsers}
            options={{ title: "Local Users" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

registerRootComponent(App);
