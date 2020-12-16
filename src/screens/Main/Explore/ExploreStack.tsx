import Explore from "./ExploreHome/Explore"
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import UserProfile from "./UserProfile";
import UploadImage from "../UploadImage";

const ExploreStackNav = createStackNavigator();
function ExploreStack() {
    return (
        <ExploreStackNav.Navigator initialRouteName="Explore">
            <ExploreStackNav.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ title: "UserProfile" }}
            />
            <ExploreStackNav.Screen
                name="UploadImage"
                component={UploadImage}
                options={{ title: "UploadImage" }}
            />
            <ExploreStackNav.Screen
                name="Explore"
                component={Explore}
            />
        </ExploreStackNav.Navigator>
    );
}

export default ExploreStack;