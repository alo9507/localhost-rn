import React from "react";
import Login from "../Login";
import { createStackNavigator } from "@react-navigation/stack";

const LoginStack = createStackNavigator();

function LoginStackScreens({ dispatch }) {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={Login}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
        </LoginStack.Navigator>
    )
}

export default LoginStackScreens