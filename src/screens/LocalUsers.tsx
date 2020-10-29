import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import config from "../aws-exports";
import { registerRootComponent } from "expo";
import Login from "./screens/Login";

import { createStackNavigator } from "@react-navigation/stack";
import StoreContext from "../store/StoreContext";
import AsyncStorage from "@react-native-community/async-storage";

import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import { useQuery, gql } from "@apollo/client";

const initialState = { id: "mynewid", name: "", location: "" };

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      sex
      age
      isVisible
      email
    }
  }
`

const LocalUsers = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
  const [users, setUsers] = useState([]);

  const [store, setStore] = React.useContext(StoreContext);
  const authManager = new EZAuthManager();

  const { loading, error, data } = useQuery(GET_USERS);

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

  useEffect(() => {
    console.log(store.user)
    props.navigation.setOptions({ title: store.user?.name ? store.user.name : "No Name" });
  }, [])

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

  async function signOut() {
    let authResult = await authManager.signOut()
    console.log(authResult)
    props.navigation.navigate("Login");
  }

  if (loading) return <div>"Loading..."</div>
  if (error) return `Error! ${error}`;

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      {data.users.map((user, index) => (
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
