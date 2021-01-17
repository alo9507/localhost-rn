import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EditProfile from "./EditProfile"
import Gender from "./Gender"
import Hometown from "./Hometown"
import Name from "./Name"
import EducationForm from "./education/EducationForm"
import Work from "./work/Work"
import Age from "./Age"
import UserProfile from "../../Explore/UserProfile"
import EditProfileProvider from "./store/EditProfileProvider"
import WorkProvider from "./work/store/WorkProvider";
import EducationProvider from "./education/store/EducationProvider";

const EditProfileStack = createStackNavigator()
function EditProfileStackNavigator() {
    return (
        <EditProfileProvider>
            <WorkProvider>
                <EducationProvider>
                    <EditProfileStack.Navigator initialRouteName="EditProfile">
                        <EditProfileStack.Screen
                            name="EditProfile"
                            component={EditProfile}
                            options={{ headerShown: false }}
                        />
                        <EditProfileStack.Screen
                            name="UserProfile"
                            component={UserProfile}
                            options={{ title: "UserProfile" }}
                        />
                        <EditProfileStack.Screen
                            name="Name"
                            component={Name}
                            options={{ title: "Name" }}
                        />
                        <EditProfileStack.Screen
                            name="Gender"
                            component={Gender}
                            options={{ title: "Gender" }}
                        />
                        <EditProfileStack.Screen
                            name="Age"
                            component={Age}
                            options={{ title: "Age" }}
                        />
                        <EditProfileStack.Screen
                            name="Hometown"
                            component={Hometown}
                            options={{ title: "Hometown" }}
                        />
                        <EditProfileStack.Screen
                            name="Work"
                            component={Work}
                            options={{ title: "Work" }}
                        />
                        <EditProfileStack.Screen
                            name="Education"
                            component={EducationForm}
                            options={{ title: "Education" }}
                        />
                    </EditProfileStack.Navigator>
                </EducationProvider>
            </WorkProvider>
        </EditProfileProvider>
    )
}

export default EditProfileStackNavigator