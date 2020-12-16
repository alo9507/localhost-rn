import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import VisibilityPreferences from "./VisibilityPreferences"

const VisibilityPreferencesStack = createStackNavigator()
function VisibilityPreferencesStackNavigator() {
    return (
        <VisibilityPreferencesStack.Navigator initialRouteName="VisibilityPreferences">
            <VisibilityPreferencesStack.Screen
                name="VisibilityPreferences"
                component={VisibilityPreferences}
                options={{ headerShown: false }}
            />
        </VisibilityPreferencesStack.Navigator>
    )
}

export default VisibilityPreferencesStackNavigator