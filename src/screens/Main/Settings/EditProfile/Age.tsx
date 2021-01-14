import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import EditProfileContext from "./store/EditProfileContext"

const Age = (props) => {
    const [editProfileState, setEditProfileState] = React.useContext(EditProfileContext);

    const [age, setAge] = useState({ "age": editProfileState.age })

    console.log("editProfileState in AGE", editProfileState)
    const handleBlur = () => {
        setEditProfileState({ type: "UPDATE_USER_PATCH", payload: parseInt(age.age) })
    }

    return (
        <>
            <Text>Age: {age.age}</Text>
            <View>
                <TextInput
                    value={age.age}
                    onChangeText={(value) => setAge({ "age": value })}
                    onBlur={handleBlur}
                />
            </View>
        </>
    );
};

export default Age;
