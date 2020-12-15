import React from "react";
import ChatStack from "./Chat/ChatStack";
import ExploreStack from "./Explore/ExploreStack"
import SettingsStackNavigator from "./Settings/SettingsStack"
import NodsStackNavigator from "./Nods/NodsStackNavigator";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTabNavigator = createBottomTabNavigator();
function MainTabNavigator({ dispatch }) {
    return (
        <BottomTabNavigator.Navigator initialRouteName="Settings">
            <BottomTabNavigator.Screen name="Explore" component={ExploreStack} />
            <BottomTabNavigator.Screen name="Nods" component={NodsStackNavigator} />
            <BottomTabNavigator.Screen name="Chat" component={ChatStack} />
            <BottomTabNavigator.Screen name="Settings" children={() => <SettingsStackNavigator dispatch={dispatch} />} />
        </BottomTabNavigator.Navigator>
    )
}

export default MainTabNavigator;