import React from "react";
import { View, Text, Input } from "react-native";
import StoreContext from "../../../../store/StoreContext";

const Work = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    return (
        <>
            <Text>Work</Text>
            <View>
                <Input
                    onChangeText={(val) => handleTextChange(val)}
                    onBlur={() => handleOnBlur()}
                />
            </View>
        </>
    );
};

export default Work;
