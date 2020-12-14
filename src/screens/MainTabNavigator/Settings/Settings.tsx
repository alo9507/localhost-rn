import React from "react";
import { View, Text, Button, TouchableHighlight } from "react-native";
import StoreContext from "../../../store/StoreContext";

const Settings = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

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
            <Text>Settings</Text>
            <View>
                <Button title="Sign Out" onPress={signOut} />
                <Button title="Edit Profile" onPress={editProfile} />
            </View>
        </>
    );
};

export default Settings;
