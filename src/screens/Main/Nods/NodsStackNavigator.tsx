import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Nods from "./Nods"
import UserProfile from "../Explore/UserProfile"
import NodsProvider from "./store/NodsProvider";

const NodsStack = createStackNavigator();
function NodsStackNavigator() {
    return (
        <NodsProvider>
            <NodsStack.Navigator
                screenOptions={{ animationEnabled: true }}
                mode="modal"
            >
                <NodsStack.Screen
                    name="Nods"
                    component={Nods}
                    options={{ title: "Nods" }}
                />
                <NodsStack.Screen
                    name="UserProfile"
                    component={UserProfile}
                    options={{ title: "UserProfile" }}
                />
            </NodsStack.Navigator>
        </NodsProvider>
    )
}

export default NodsStackNavigator