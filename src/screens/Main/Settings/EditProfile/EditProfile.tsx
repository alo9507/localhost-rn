import React, { useContext, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import useEditProfileState from "./hooks/useEditProfileState"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import WorkContext from "./work/store/WorkContext"
import EducationContext from "./education/store/EducationContext";

const EditProfile = (props) => {
    const [editProfileState, updateEditProfileState, submit] = useEditProfileState()
    const [currentUser, updateCurrentUser] = useCurrentUser()
    const [workExperience, setWorkExperience] = useContext(WorkContext)
    const [education, setEducation] = useContext(EducationContext)

    const cancel = () => {
        props.navigation.pop()
    }

    useEffect(() => {
        console.log("useeffect ran")
        setWorkExperience({ type: "UPDATE_WORK_EXPERIENCE", payload: editProfileState["workExperience"] })
        setEducation({ type: "UPDATE_EDUCATION", payload: editProfileState["education"] })
    }, [])

    const view = () => {
        props.navigation.navigate("UserProfile", { user: { ...currentUser, ...editProfileState } })
    }

    const done = async () => {
        await submit()
        props.navigation.pop()
    }

    return (
        <>
            <View style={styles.container}>
                <Button title="Cancel" onPress={cancel} />
                <Button title="Done" onPress={done} />
                <Button title="View" onPress={view} />
                <Button title="Work" onPress={(e) => props.navigation.navigate("Work", { keyName: "workExperience", editProfileState, updateEditProfileState })} />
                <Button title="School" onPress={(e) => props.navigation.navigate("Education", { keyName: "education", editProfileState, updateEditProfileState })} />
                <Button title="Name" onPress={(e) => props.navigation.navigate("Name")} />
                <Button title="Gender" onPress={(e) => props.navigation.navigate("Gender")} />
                <Button title="Age" onPress={(e) => props.navigation.navigate("Age", { keyName: "age", editProfileState, updateEditProfileState })} />
                <Button title="Hometown" onPress={(e) => props.navigation.navigate("Hometown", { keyName: "hometown", editProfileState, updateEditProfileState })} />
            </View>
        </ >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: "150px" },
});

export default EditProfile;
