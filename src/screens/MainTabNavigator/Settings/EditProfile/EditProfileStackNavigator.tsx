import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Gender from "./Gender"
import EditProfile from "./EditProfile"

const EditProfileStack = createStackNavigator()
function EditProfileStackNavigator() {
    return (
        <EditProfileStack.Navigator initialRouteName="EditProfile">
            <EditProfileStack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <EditProfileStack.Screen
                name="Gender"
                component={Gender}
                options={{ title: "Gender" }}
            />
        </EditProfileStack.Navigator>
    )
}

export default EditProfileStackNavigator