import React from "react";
import Launch from "../Launch";
import { createStackNavigator } from "@react-navigation/stack";

const LaunchStack = createStackNavigator();
function LaunchStackScreens() {
    return (
        <LaunchStack.Navigator>
            <LaunchStack.Screen
                name="Launch"
                component={Launch}
                options={{ title: "Launch" }}
            />
        </LaunchStack.Navigator>
    )
}

export default LaunchStackScreens;