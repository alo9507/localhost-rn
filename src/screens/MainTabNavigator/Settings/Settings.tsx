import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import StoreContext from "../../../store/StoreContext";

const Settings = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    async function signOut() {
        let authResult = await appState.authManager.signOut()
        console.log(authResult)
        props.route.params.dispatch({ type: "IS_NOT_AUTHENTICATED" })
    }

    return (
        <>
            <Text>Settings</Text>
            <View>
                <Button title="Sign Out" onPress={signOut} />
            </View>
        </>
    );
};

export default Settings;
