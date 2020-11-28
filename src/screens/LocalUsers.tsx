import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import StoreContext from "../store/StoreContext";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import User from "../models/User"
import AppState from "../models/AppState"
import { Switch } from "react-native"

const initialState = { id: "mynewid", name: "", location: "" };

const LocalUsers = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 24.22244098031902, longitude: 23.125367053780863 });
  const [appState, setAppState] = React.useContext(StoreContext);
  const [isVisible, setIsVisible] = useState(appState.user.isVisible)

  const toggleSwitch = async () => {
    const users = await appState.userRepository.updateUser({ id: appState.user.id, isVisible: !isVisible })
    setIsVisible(previousState => !previousState);
  }

  const [showMeCriteria, setShowMeCriteria] = useState({
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
    async function getUsers() {
      try {
        const users = await appState.userRepository.updateLocationGetUsers({ id: appState.user.id, ...location })
        setState({ ...state, users, loading: false })
      } catch (e) {
        setState({ ...state, loading: false, error: e })
      }
    }

    getUsers()
  }, [isVisible])

  useEffect(() => {
  }, [isVisible])

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
      <View style={styles.container}>
        <Text>isVisible: {isVisible}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isVisible ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isVisible}
        />
      </View>
      <Button title="Sign Out" onPress={signOut} />
      <View>
        <Text>VISIBILITY CONTROLS: AGE: {showMeCriteria.age[0]} / {showMeCriteria.age[1]} SEX: {showMeCriteria.sex}</Text>
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
