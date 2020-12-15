import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Nods from "./Nods"

const NodsStack = createStackNavigator();
function NodsStackNavigator() {
    return (
        <NodsStack.Navigator>
            <NodsStack.Screen
                name="Nods"
                component={Nods}
                options={{ title: "Nods" }}
            />
        </NodsStack.Navigator>
    )
}

export default NodsStackNavigator