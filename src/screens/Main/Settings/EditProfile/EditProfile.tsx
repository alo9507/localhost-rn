import { parse } from "@babel/core";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import StoreContext from "../../../../store/StoreContext";
import EditProfileContext from "./store/EditProfileContext"

const EditProfile = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);
    const [editProfileState, setEditProfileState] = React.useContext(EditProfileContext);

    const cancel = () => {
        props.navigation.pop()
    }

    const done = async () => {
        const result = await appState.userRepository.updateUser(editProfileState)
        setAppState({ type: "UPDATE_USER", payload: result })
        props.navigation.pop()
    }

    const view = () => {
        props.navigation.navigate("UserProfile", { user: { ...appState.user, ...editProfileState } })
    }

    const updateEditProfileState = (patch) => {
        setEditProfileState({ type: "UPDATE_USER_PATCH", payload: patch })
    }

    return (
        <>
            <View style={styles.container}>
                <Button title="Cancel" onPress={cancel} />
                <Button title="Done" onPress={done} />
                <Button title="View" onPress={view} />
                <Button title="Work" onPress={(e) => props.navigation.navigate("Work")} />
                <Button title="School" onPress={(e) => props.navigation.navigate("School")} />
                <Button title="Hometown" onPress={(e) => props.navigation.navigate("Hometown", { keyName: "hometown", editProfileState, updateEditProfileState })} />
                <Button title="Name" onPress={(e) => props.navigation.navigate("Name")} />
                <Button title="Gender" onPress={(e) => props.navigation.navigate("Gender")} />
                <Button title="Age" onPress={(e) => props.navigation.navigate("Age", { keyName: "age", editProfileState, updateEditProfileState })} />
            </View>
        </ >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: "150px" },
});

export default EditProfile;
