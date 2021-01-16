import React, { useState, useEffect } from "react";
import { Button, Alert, Text } from "react-native";
import StoreContext from "../../../store/StoreContext";
import styled from "styled-components/native"; "styled-components/native";

const Landing = (props) => {
  const [appState, setAppState] = React.useContext(StoreContext);

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

  async function signIn() {
    try {
      const authSession = await appState.authManager.signIn(formState.email, formState.password)
      const user = await appState.userRepository.getUser(authSession.userId)
      setAppState({ type: "OVERWRITE_USER", payload: user });
      props.route.params.dispatch({ type: "IS_AUTHENTICATED" });
    } catch (error) {
      console.log("Error Signing In:", error);
      Alert.alert(
        "Error",
        JSON.stringify(error),
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    }
  }

  return (
    <>
      <Container>
        <Logo>localhost</Logo>
        <CreateAccountButton title="Sign Up" onPress={() => props.route.params.dispatch({ type: "IS_ONBOARDING" })} />
        <SignInButton title="Sign In" onPress={signIn} />
      </Container>
    </>
  );
};

const Logo = styled.Text`
color: blue;
`

const CreateAccountButton = styled.Button`
  background-color: purple;
  color: black;
`

const SignInButton = styled.Button`

`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export default Landing;
