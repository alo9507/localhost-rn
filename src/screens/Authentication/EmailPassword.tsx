import React, { useState } from "react";
import { Button } from "react-native";
import StoreContext from "../../store/StoreContext";
import styled from "styled-components/native";

const EmailPassword = (props) => {
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

    async function signUp() {
        try {
            const authSession = await appState.authManager.signUp(formState.email, formState.password)
            console.log(authSession)
            const user = await appState.userRepository.createUser(authSession.userId, formState.email)
            setAppState({ ...appState, user });
            props.navigation.navigate("Onboarding");
        } catch (e) {
            console.log("Error signing up:", e);
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
                <Button title="Sign Up" onPress={signUp} />
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

export default EmailPassword;
