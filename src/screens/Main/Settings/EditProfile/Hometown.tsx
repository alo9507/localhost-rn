import React from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";

const Hometown = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    return (
        <>
            <Text>Hometown</Text>
            <View>
                <Button title="Submit" onPress={close} />
            </View>
        </>
    );
};

export default Hometown;
