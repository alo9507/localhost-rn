import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";
import config from "../aws-exports";
import { registerRootComponent } from "expo";
import Login from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StoreContext from "../data/StoreContext";

const initialState = { id: "mynewid", name: "", location: "" };

const LocalUsers = () => {
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
  const [users, setUsers] = useState([]);

  const [state, setState] = React.useContext(StoreContext);

  useEffect(() => {
    console.log(`User object: ${state.user}`);
    fetchUsers();
  }, []);

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
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setInput(
      "location",
      `${location.coords.latitude} : ${location.coords.longitude}`
    );
  };

  const geoFailure = (error) => {
    console.log(error);
  };

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchUsers() {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const users = usersData.data.listUsers.items;
      setUsers(users);
    } catch (err) {
      console.log("error fetching users");
    }
  }

  async function addUser() {
    try {
      const user = { ...formState };
      setUsers([...users, user]);
      setFormState(initialState);
      console.log(user);
      await API.graphql(graphqlOperation(createUser, { input: user }));
    } catch (err) {
      console.log("error creating user:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(val) => setInput("name", val)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <TextInput
        onChangeText={(val) => setInput("location", val)}
        style={styles.input}
        value={formState.location}
        placeholder="Location"
      />
      <Button title="Create User" onPress={addUser} />
      {users.map((user, index) => (
        <View key={user.id ? user.id : index} style={styles.user}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text>{user.location}</Text>
          <Text>{user.id}</Text>
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
