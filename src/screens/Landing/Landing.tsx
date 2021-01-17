import React from "react";
import StoreContext from "../../store/StoreContext";
import styled from "styled-components/native"; "styled-components/native";

const Landing = (props) => {
  const [appState, setAppState] = React.useContext(StoreContext);

  async function signIn() {
    props.navigation.navigate("PhoneNumber", { isSignIn: true })
  }

  return (
    <>
      <Container>
        <Logo>localhost</Logo>
        <CreateAccountButton title="Sign Up" onPress={() => appState.dispatch({ type: "IS_ONBOARDING" })} />
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
