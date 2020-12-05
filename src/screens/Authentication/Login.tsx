import React, { useState } from "react";
import { Button } from "react-native";
import StoreContext from "../../store/StoreContext";
import styled from "styled-components/native";

const Login = (props) => {
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
      setAppState({ ...appState, user });
      props.route.params.dispatch({ type: "IS_AUTHENTICATED" });
    } catch (error) {
      console.log(error)
      console.log("Error Signing In:", error);
    }
  }

  return (
    <>
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
        <Button title="Sign In" onPress={signIn} />
        <Button title="Sign Up" onPress={() => props.navigation.navigate("EmailPassword")} />
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

export default Login;
