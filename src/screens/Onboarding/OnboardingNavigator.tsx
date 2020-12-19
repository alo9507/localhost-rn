import React from "react";
import Onboarding from "./Onboarding";
import { createStackNavigator } from "@react-navigation/stack";

const OnboardingStack = createStackNavigator();

function OnboardingStackScreens({ dispatch }) {
    return (
        <OnboardingStack.Navigator>
            <OnboardingStack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ title: "Onboarding" }}
                initialParams={{ dispatch }}
            />
        </OnboardingStack.Navigator>
    )
}

export default OnboardingStackScreens;