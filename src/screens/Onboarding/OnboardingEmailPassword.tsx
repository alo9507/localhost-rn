import React, { useContext, useState } from "react"
import { View, Button } from "react-native";
import styles from "./OnboardingStyle"
import styled from "styled-components/native";

import StoreContext from "../../store/StoreContext";

const OnboardingEmailPassword = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);

    type LoginInitialState = {
        email: string,
        password: string,
    }

    const initial: LoginInitialState = {
        email: "",
        password: ""
    }

    const [formState, setFormState] = useState(initial);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <Input
                    onChangeText={(val) => setInput("email", val)}
                    value={formState.email}
                    placeholder="Email"
                />
                <Input
                    onChangeText={(val) => setInput("password", val)}
                    value={formState.password}
                    placeholder="Password"
                />
                <Button title="Next" onPress={() => goToNext(slideNumber)} />
            </Container>
        </View>
    )
}

const Input = styled.TextInput`
  height: 50px;
  width: 300px;
  background-color: #ddd;
  margin-bottom: 10px;
  padding: 8px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export default OnboardingEmailPassword