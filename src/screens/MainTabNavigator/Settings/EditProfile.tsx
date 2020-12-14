import React from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../store/StoreContext";

const EditProfile = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    async function close() {
        props.navigation.pop()
    }

    return (
        <>
            <Text>Settings</Text>
            <View>
                <Button title="Close" onPress={close} />
            </View>
        </>
    );
};

export default EditProfile;
