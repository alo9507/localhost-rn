import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplfiy, { API, graphqlOperation } from "aws-amplify";
import { createUser } from "../graphql/mutations";
import { listUsers } from "../graphql/queries";
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
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
      whatAmIDoing
      bio
      whatAmIDoing
      sex
      age
      location
      isVisible
    }
  }
`;

const LocalUsers = (props) => {
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
  const [users, setUsers] = useState([]);

  const [state, setState] = React.useContext(StoreContext);
  const authManager = new EZAuthManager();

  const [getUsers,] = useQuery(GET_USERS);

  useEffect(() => {
    authManager.checkForAuthSession(
      (authSession) => {
        console.log(authSession.userId);
      },
      (error) => {
        console.log(error);
      }
    );
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

  async function signOut() {
    authManager.signOut(
      (success) => {
        console.log(success);
        authManager.checkForAuthSession(
          (authSession) => {
            console.log(authSession);
            props.navigation.navigate("Login");
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={signOut} />
      {users.map((user, index) => (
        <View key={user.id ? user.id : index} style={styles.user}>
          <Text style={styles.userName}>Name: {user.name}</Text>
          <Text>ID: {user.id}</Text>
          <Text>bio: {user.bio}</Text>
          <Text>whatAmIDoing: {user.whatAmIDoing}</Text>
          <Text>isVisible: {user.isVisible}</Text>
          <Text>sex: {user.sex}</Text>
          <Text>age: {user.age}</Text>
          <Text>location: {user.location}</Text>
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