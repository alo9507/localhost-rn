import React from "react";
import Login from "./Login";
import Onboarding from "./Onboarding";
import { createStackNavigator } from "@react-navigation/stack";
import EmailPassword from "./EmailPassword";

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
            <LoginStack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ title: "Sign Up" }}
                initialParams={{ dispatch }}
            />
            <LoginStack.Screen
                name="EmailPassword"
                component={EmailPassword}
                options={{ title: "Email Password" }}
                initialParams={{ dispatch }}
            />
        </LoginStack.Navigator>
    )
}

export default LoginStackScreens