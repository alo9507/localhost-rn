import React, { useContext, useState } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"

const OnboardingName = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);

    type OnboardingNameInitialState = {
        firstName: string,
        lastName: string,
    }

    const initial: OnboardingNameInitialState = {
        firstName: "",
        lastName: ""
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
                    onChangeText={(val) => setInput("firstName", val)}
                    value={formState.firstName}
                    placeholder="First Name"
                />
                <Input
                    onChangeText={(val) => setInput("lastName", val)}
                    value={formState.lastName}
                    placeholder="Last Name"
                />
                <Button title="Next" onPress={() => goToNext(slideNumber)} />
            </Container>
        </View >
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

export default OnboardingName