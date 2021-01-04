import React, { useContext, useState } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"
import OnboardingForm from "./OnboardingForm"

const OnboardingLocation = ({ item, goToNext, slideNumber }) => {
    const [appState, setAppState] = useContext(StoreContext);

    async function submitAndGoToNext() {

    }

    const bgStyle = { backgroundColor: item.backgroundColor }
    return (
        <View style={[styles.slide, bgStyle]}>
            <Container>
                <Text>Location</Text>
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

export default OnboardingLocation