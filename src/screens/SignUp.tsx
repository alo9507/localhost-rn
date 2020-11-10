import React, { useEffect, useState } from "react";
import StoreContext from "../store/StoreContext";
import styled from "styled-components/native";
import { Button } from "react-native"

const SignUp = (props) => {

  const initialState = {
    name: "",
    bio: "",
    whatAmIDoing: "",
    sex: "",
    age: 0,
    isVisible: true,
  };

  const [formState, setFormState] = useState(initialState);
  const [appState, setAppState] = React.useContext(StoreContext);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const join = async () => {
    console.log(appState)
    const user = { ...formState, id: appState.user.id };
    console.log("update input", user)
    try {
      const updatedUser = await appState.userRepository.updateUser(user)
      return props.navigation.navigate("LocalUsers");
    } catch (e) {
      console.log(`Error signing up new user:`, e);
    }
  };

  useEffect(() => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 2000,
    };
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoFailure,
      geoOptions
    );
  }, []);

  const geoSuccess = (location) => {
    console.log(location);
  };

  const geoFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container>
        <Input
          onChangeText={(val) => setInput("name", val)}
          value={formState.name}
          placeholder="Name"
        />
        <Input
          onChangeText={(val) => setInput("sex", val)}
          value={formState.sex}
          placeholder="Sex"
        />
        <Input
          type="number"
          onChangeText={(val) => setInput("age", parseInt(val))}
          value={formState.age}
          placeholder="Age"
        />
        <Input
          onChangeText={(val) => setInput("whatAmIDoing", val)}
          value={formState.whatAmIDoing}
          placeholder="What Am I doing"
        />
        <Input
          onChangeText={(val) => setInput("bio", val)}
          value={formState.bio}
          placeholder="bio"
        />
        <Button title="Sign Up" onPress={join} />
      </Container>
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

export default SignUp;
