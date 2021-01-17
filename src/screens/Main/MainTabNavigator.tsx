import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatStackNavigator from "./Chat/ChatStackNavigator";
import ExploreStack from "./Explore/ExploreStack"
import SettingsStackNavigator from "./Settings/SettingsStackNavigator"
import NodsStackNavigator from "./Nods/NodsStackNavigator";

const BottomTabNavigator = createBottomTabNavigator();
function MainTabNavigator({ dispatch }) {
    return (
        <BottomTabNavigator.Navigator initialRouteName="Settings">
            <BottomTabNavigator.Screen name="Explore" component={ExploreStack} />
            <BottomTabNavigator.Screen name="Nods" component={NodsStackNavigator} />
            <BottomTabNavigator.Screen name="Chat" component={ChatStackNavigator} />
            <BottomTabNavigator.Screen name="Settings" children={() => <SettingsStackNavigator dispatch={dispatch} />} />
        </BottomTabNavigator.Navigator>
    )
}

export default MainTabNavigator;