import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { User } from "../models/types";
import { CreateUserInput } from "../graphql/API";
import StoreContext from "../data/StoreContext";

const Login = (props) => {
  const initialState = { name: "", bio: "", email: "", password: "" };

  const [formState, setFormState] = useState(initialState);
  const [state, setState] = React.useContext(StoreContext);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signUp() {
    try {
      const signUpResult = await Auth.signUp({
        username: formState.email,
        password: formState.password,
      });

      const userId = signUpResult.userSub;

      const newUser = {
        id: userId,
      };

      await API.graphql(
        graphqlOperation(createUser, { input: { ...newUser } })
      );

      setState({ ...state, user: newUser.id });

      props.navigation.navigate("LocalUsers");
    } catch (error) {
      console.log("Error signing up:", error);
    }
  }

  async function signIn() {
    try {
      const { user } = await Auth.signIn({
        username: formState.email,
        password: formState.password,
      });
      console.log(Auth.currentAuthenticatedUser());
      console.log(Auth.currentSession());
      console.log(Auth.currentUserInfo());
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          onChangeText={(val) => setInput("email", val)}
          style={styles.input}
          value={formState.location}
          placeholder="Email"
        />
        <TextInput
          onChangeText={(val) => setInput("password", val)}
          style={styles.input}
          value={formState.location}
          placeholder="Password"
        />
        <Button title="Sign Up" onPress={signUp} />
      </View>

      <View style={styles.container}>
        <TextInput
          onChangeText={(val) => setInput("email", val)}
          style={styles.input}
          value={formState.location}
          placeholder="Email"
        />
        <TextInput
          onChangeText={(val) => setInput("password", val)}
          style={styles.input}
          value={formState.location}
          placeholder="Password"
        />
        <Button title="Sign In" onPress={signIn} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  userName: { fontSize: 18 },
});

export default Login;
