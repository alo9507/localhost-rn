import React from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";

const Work = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    return (
        <>
            <Text>Work</Text>
            <View>
                <Button title="Submit" onPress={close} />
            </View>
        </>
    );
};

export default Work;
