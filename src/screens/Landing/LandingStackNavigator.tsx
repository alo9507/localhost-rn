import React from "react";
import Landing from "./Landing";
import { createStackNavigator } from "@react-navigation/stack";

const LandingStack = createStackNavigator();

function LandingStackScreens({ dispatch }) {
    return (
        <LandingStack.Navigator>
            <LandingStack.Screen
                name="Landing"
                component={Landing}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
            <LandingStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
        </LandingStack.Navigator>
    )
}

export default LandingStackScreens