import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import StoreContext from "../store/StoreContext";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import User from "../models/User"
import AppState from "../models/AppState"

const initialState = { id: "mynewid", name: "", location: "" };

const LocalUsers = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 24.22244098031902, longitude: 23.125367053780863 });
  const [appState, setAppState] = React.useContext(StoreContext);

  const [visibilityControls, setVisibilityControls] = useState({
    id: appState.user.id,
    sex: appState.user.showMeCriteria.sex,
    age: appState.user.showMeCriteria.age
  })

  type LocalUsersInitialState = {
    loading: boolean,
    error: boolean,
    users: User[],
  }

  const initial: LocalUsersInitialState = {
    users: [],
    loading: true,
    error: false
  }

  const [state, setState] = useState(initial)

  useEffect(() => {
    console.log(JSON.stringify(appState.user))
    async function getUsers() {
      try {
        console.log(appState.user.id)
        const users = await appState.userRepository.updateLocationGetUsers({ id: appState.user.id, ...location })
        setState({ ...state, users, loading: false })
      } catch (e) {
        setState({ ...state, loading: false, error: true })
      }
    }

    getUsers()
  }, [])

  useEffect(() => {
  }, [visibilityControls])

  useEffect(() => {
    props.navigation.setOptions({ title: appState.user?.name ? appState.user.name : "No Name" });
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function signOut() {
    let authResult = await appState.authManager.signOut()
    console.log(authResult)
    props.navigation.navigate("Login");
  }

  if (state.loading) return <div>"Loading..."</div>
  if (state.error) return `Error! ${state.error}`;

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      <View>
        <Text>VISIBILITY CONTROLS: AGE: {visibilityControls.age[0]} / {visibilityControls.age[1]} SEX: {visibilityControls.sex}</Text>
      </View>
      {state.users.map((user, index) => (
        <View key={user.id ? user.id : index} style={styles.user}>
          <Text style={styles.userName}>Name: {user.name}</Text>
          <Text>ID: {user.id}</Text>
          <Text>bio: {user.bio}</Text>
          <Text>whatAmIDoing: {user.whatAmIDoing}</Text>
          <Text>isVisible: {user.isVisible}</Text>
          <Text>sex: {user.sex}</Text>
          <Text>age: {user.age}</Text>
          <Text>location: {user.location}</Text>
          <Text>email: {user.email}</Text>
          <Text>latitude: {user.latitude}</Text>
          <Text>longitude: {user.longitude}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  userName: { fontSize: 18 },
});

export default LocalUsers;
