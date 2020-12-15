import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const AccountStack = createStackNavigator()
function AccountStackNavigator() {
    return (
        <AccountStack.Navigator initialRouteName="EditProfile">
            <AccountStack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen
                name="Gender"
                component={Gender}
                options={{ title: "Gender" }}
            />
        </AccountStack.Navigator>
    )
}

export default AccountStackNavigator