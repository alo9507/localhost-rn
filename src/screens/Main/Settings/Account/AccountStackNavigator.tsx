import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Account from "./Account"

const AccountStack = createStackNavigator()
function AccountStackNavigator({ dispatch }) {
    return (
        <AccountStack.Navigator initialRouteName="Account">
            <AccountStack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
                initialParams={{ dispatch }}
            />
        </AccountStack.Navigator>
    )
}

export default AccountStackNavigator