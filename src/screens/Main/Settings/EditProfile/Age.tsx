import React from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";
import EditProfileContext from "./store/EditProfileContext"

const Age = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);
    const [editProfileState, stEditProfileState] = React.useContext(EditProfileContext);

    console.log(JSON.stringify(editProfileState))

    return (
        <>
            <Text>Age</Text>
            <View>

                <Button title="Submit" onPress={() => submit()} />
            </View>
        </>
    );
};

export default Age;
