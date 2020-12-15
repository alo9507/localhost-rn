import React from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";

const EditProfile = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    function close() {
        props.navigation.pop()
    }

    function gender() {
        props.navigation.navigate("Gender")
    }

    return (
        <>
            <View>
                <Button title="Close" onPress={close} />
                <Button title="Gender" onPress={gender} />
            </View>
        </>
    );
};

export default EditProfile;
