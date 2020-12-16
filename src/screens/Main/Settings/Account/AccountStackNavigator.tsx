import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "./Account"

const AccountStack = createStackNavigator()
function AccountStackNavigator() {
    return (
        <AccountStack.Navigator initialRouteName="Account">
            <AccountStack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
            />
        </AccountStack.Navigator>
    )
}

export default AccountStackNavigator