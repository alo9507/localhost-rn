import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import StoreContext from "../../../store/StoreContext";

const Settings = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    return (
        <>
            <View>
                <View style={styles.profileImgContainer}>
                    <Image source={{ uri: appState.user.profileImageUrl }} style={styles.profileImg} />
                </View>
                <Button title="Edit Profile" onPress={() => props.navigation.navigate("EditProfile")} />
                <Button title="Visibility Preferences" onPress={() => props.navigation.navigate("VisibilityPreferences")} />
                <Button title="Account" onPress={() => props.navigation.navigate("Account")} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    profileImgContainer: {
        margin: "auto",
    },
    profileImg: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
});

export default Settings;
