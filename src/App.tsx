import React from "react";

import config from "../aws-exports";
import { registerRootComponent } from "expo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreProvider from "./store/StoreProvider";

import Amplfiy from "aws-amplify";

// screens
import Launch from "./screens/Launch";
import FirstLaunch from "./screens/FirstLaunch";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import LocalUsers from "./screens/LocalUsers";

Amplfiy.configure(config);

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Launch">
      <HomeStack.Screen
        name="Launch"
        component={Launch}
        options={{ title: "Launch" }}
      />
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Sign In/Sign Up" }}
      />
      <HomeStack.Screen
        name="LocalUsers"
        component={LocalUsers}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Become a Member" }}
      />
      <HomeStack.Screen
        name="FirstLaunch"
        component={FirstLaunch}
        options={{ title: "First Launch Screen" }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="UserSettings"
        component={FirstLaunch}
        options={{ title: "First Launch Screen" }}
      />
    </SettingsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

registerRootComponent(App);
