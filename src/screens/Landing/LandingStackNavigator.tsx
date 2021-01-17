import React from "react";
import Landing from "./Landing";
import PhoneNumber from "../Authentication/PhoneNumberSignUp"
import ConfirmPhoneNumber from "../Authentication/ConfirmPhoneNumber"
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
                name="PhoneNumber"
                component={PhoneNumber}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
            <LandingStack.Screen
                name="ConfirmSignIn"
                component={ConfirmPhoneNumber}
                options={{ title: "Sign In/Sign Up" }}
                initialParams={{ dispatch }}
            />
        </LandingStack.Navigator>
    )
}

export default LandingStackScreens