import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";
import styled from "styled-components/native";

const Hometown = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);
    const [formState, setFormState] = useState({ hometown: appState.user.hometown });

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function submit() {
        await appState.userRepository.updateUser({ id: appState.user.id, ...formState })
        setAppState({ type: "UPDATE_USER", payload: { ...formState } })
    }

    return (
        <>
            <Text>Hometown</Text>
            <View>
                <Container>
                    <Input
                        onChangeText={(val) => setInput("hometown", val)}
                        onBlur={submit}
                        value={formState.hometown}
                        placeholder="Where are you from?"
                    />
                </Container>
            </View>
        </>
    );
};

const Input = styled.TextInput`
  height: 50px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export default Hometown;
