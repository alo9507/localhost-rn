import React from "react";
import FirstLaunch from "./FirstLaunch";
import { createStackNavigator } from "@react-navigation/stack";

const LaunchStack = createStackNavigator();

function LaunchStackScreens({ dispatch }) {
    return (
        <LaunchStack.Navigator>
            <LaunchStack.Screen
                name="Launch"
                component={FirstLaunch}
                options={{ title: "Launch", headerShown: false }}
                initialParams={{ dispatch }}

            />
        </LaunchStack.Navigator>
    )
}

export default LaunchStackScreens;