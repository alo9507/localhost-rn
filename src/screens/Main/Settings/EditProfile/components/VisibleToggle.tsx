import React from "react";
import { Text, Switch } from "react-native";

const EditProfileVisibleToggle = (props) => {

    return (
        <>
            <Text>You Are Invisible</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={props.toggleSwitch}
                value={false}
            />
        </>
    );
};

export default EditProfileVisibleToggle;
