import React, { useReducer, useContext } from "react"
import { View, Text, Button } from "react-native"
import styles from "./OnboardingStyle"
import styled from "styled-components/native";
import StoreContext from "../../store/StoreContext"
import * as Location from 'expo-location';

const OnboardingLocation = ({ item, goToNext, slideNumber }) => {
  const [appState, setAppState] = useContext(StoreContext);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOADING':
          return {
            loading: true,
            error: null,
            location: null
          };
        case 'ERROR':
          return {
            loading: false,
            error: action.payload,
            location: null
          };
        case 'LOCATION':
          return {
            loading: false,
            error: null,
            location: action.payload
          };
        default:
          throw new Error(`UNKNOWN ACTION: ${action.type}`)
      }
    },
    {
      loading: false,
      error: null,
      location: null
    }
  );

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      dispatch({ type: "ERROR", payload: 'Permission to access location was denied' })
      return;
    }

    dispatch({ type: "LOADING" })
    let location = await Location.getCurrentPositionAsync({});
    dispatch({ type: "LOCATION", payload: location })
  }

  let text = 'Waiting..';
  if (state.error) {
    text = state.error;
  } else if (state.location) {
    text = JSON.stringify(state.location);
  }

  const bgStyle = { backgroundColor: item.backgroundColor }
  return (
    <View style={[styles.slide, bgStyle]}>
      <Container>
        <View style={styles.container}>
          <Text>{text}</Text>
          <Button onPress={getLocation} title="Enable Location" />
        </View>
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