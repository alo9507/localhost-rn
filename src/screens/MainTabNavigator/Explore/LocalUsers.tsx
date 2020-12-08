import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight } from "react-native";
import StoreContext from "../../../store/StoreContext";
import User from "../../../models/User"
import { Switch } from "react-native"
import SegmentedControl from '@react-native-community/segmented-control';
import { Link } from '@react-navigation/native';

const initialState = { id: "mynewid", name: "", location: "" };

const LocalUsers = (props) => {
  const [appState, setAppState] = React.useContext(StoreContext);
  console.log("LOCAL USER APP STATE: ", appState)
  const selectedSex = () => {
    const sexcriteria = appState.user.showMeCriteria.sex
    let selected = 0
    if (sexcriteria.includes("male") && sexcriteria.includes("female")) {
      selected = 0
    } else if (sexcriteria.includes("male")) {
      selected = 1
    } else {
      selected = 2
    }
    return selected
  }

  const [high, setHigh] = useState(0)
  const [low, setLow] = useState(0)
  const [formState, setFormState] = useState(initialState);
  const [location, setLocation] = useState({ latitude: 24.22244098031902, longitude: 23.125367053780863 });
  const [sex, setSex] = useState(selectedSex())
  const [isVisible, setIsVisible] = useState(appState.user.isVisible)
  const [ageRange, setAgeRange] = useState(appState.user.showMeCriteria.age)

  const toggleSwitch = async () => {
    const user = await appState.userRepository.updateUser({ id: appState.user.id, isVisible: !isVisible })
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
  }, [isVisible, sex])

  const changeSex = async (selectedIndex) => {
    let sexArray: String[] = []
    switch (selectedIndex) {
      case 0:
        sexArray = ['male', 'female']
        break;
      case 1:
        sexArray = ['male']
        break;
      case 2:
        sexArray = ['female']
        break;
    }
    await appState.userRepository.updateShowMeCriteria({ id: appState.user.id, sex: sexArray })
    setSex(selectedIndex)
  }

  useEffect(() => {
    props.navigation.setOptions({ title: appState.user?.name ? appState.user.name : "No Name" });
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  if (state.loading) return <Text>"Loading..."</Text>
  if (state.error) return `Error! ${state.error}`;

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SegmentedControl
          values={['all', 'male', 'female']}
          selectedIndex={sex}
          onChange={(event) => {
            changeSex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
        <Text>{sex}</Text>
        <Text>isVisible: {isVisible}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isVisible ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isVisible}
        />
        <Text>VISIBILITY CONTROLS: AGE: {showMeCriteria.age[0]} / {showMeCriteria.age[1]} SEX: {showMeCriteria.sex}</Text>
      </View>
      {state.users.map((user, index) => (
        <TouchableHighlight onPress={(e) => props.navigation.navigate("UserProfile", { user })}>
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
        </TouchableHighlight>
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
