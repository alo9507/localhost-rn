import React from "react";
import Landing from "./Landing/Landing";
import { createStackNavigator } from "@react-navigation/stack";

const LoginStack = createStackNavigator();

function LoginStackScreens({ dispatch }) {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Landing"
                component={Landing}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
        </LoginStack.Navigator>
    )
}

export default LoginStackScreens