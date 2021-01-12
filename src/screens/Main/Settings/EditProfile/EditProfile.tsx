import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import StoreContext from "../../../../store/StoreContext";
import EditProfileProvider from "./store/EditProfileProvider";

const EditProfile = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    function close() {
        props.navigation.pop()
    }

    return (
        <EditProfileProvider>
            <View style={styles.container}>
                <Button title="Close" onPress={close} />
                <Button title="Work" onPress={(e) => props.navigation.navigate("Work")} />
                <Button title="School" onPress={(e) => props.navigation.navigate("School")} />
                <Button title="Hometown" onPress={(e) => props.navigation.navigate("Hometown")} />
                <Button title="Name" onPress={(e) => props.navigation.navigate("Name")} />
                <Button title="Gender" onPress={(e) => props.navigation.navigate("Gender")} />
                <Button title="Age" onPress={(e) => props.navigation.navigate("Age")} />
            </View>
        </EditProfileProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: "150px" },
});

export default EditProfile;
