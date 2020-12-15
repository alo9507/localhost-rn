import React from "react";
import { View, Image, Text, Button, TouchableHighlight, StyleSheet } from "react-native";
import StoreContext from "../../../store/StoreContext";

const Settings = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);
    console.log(appState.user)
    async function signOut() {
        let authResult = await appState.authManager.signOut()
        console.log(authResult)
        props.route.params.dispatch({ type: "IS_NOT_AUTHENTICATED" })
    }

    function editProfile() {
        props.navigation.navigate("EditProfile")
    }

    return (
        <>
            <View>
                <View style={styles.profileImgContainer}>
                    <Image source={{ uri: appState.user.profileImageUrl }} style={styles.profileImg} />
                </View>
                <Button title="Edit Profile" onPress={editProfile} />
                <Button title="Sign Out" onPress={signOut} />
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
