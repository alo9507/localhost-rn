import React from "react";
import FirstLaunch from "../FirstLaunch/FirstLaunch";
import LocalUsers from "./Explore/LocalUsers";
import UserProfile from "./Explore/UserProfile";
import UploadImage from "./UploadImage";
import Settings from "./Settings/Settings";
import Matches from "./Matches/Matches";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MatchesStack = createStackNavigator();
function MatchesStackScreen() {
    return (
        <MatchesStack.Navigator>
            <MatchesStack.Screen
                name="Matches"
                component={Matches}
                options={{ title: "Matches" }}
            />
        </MatchesStack.Navigator>
    )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="UploadImage">
            <HomeStack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ title: "UserProfile" }}
            />
            <HomeStack.Screen
                name="UploadImage"
                component={UploadImage}
                options={{ title: "UploadImage" }}
            />
            <HomeStack.Screen
                name="LocalUsers"
                component={LocalUsers}
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
function SettingsStackScreen({ dispatch }) {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={Settings}
                options={{ title: "Settings" }}
                initialParams={{ dispatch }}
            />
        </SettingsStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function MainTabNavigatorStack({ dispatch }) {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Settings" children={() => <SettingsStackScreen dispatch={dispatch} />} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Matches" component={MatchesStackScreen} />
        </Tab.Navigator>
    )
}

export default MainTabNavigatorStack;