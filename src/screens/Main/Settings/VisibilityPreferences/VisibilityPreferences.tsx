import React from "react";
import { Text, Button } from "react-native"

const VisibilityPreferences = (props) => {
    function close() {
        props.navigation.pop()
    }

    return (
        <>
            <Text>Visibility Preferences</Text>
            <Button title="Close" onPress={close} />
        </>
    )
}

export default VisibilityPreferences