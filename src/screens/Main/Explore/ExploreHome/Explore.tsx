import React, { useEffect, useState, useContext, useReducer } from "react";
import { View, Text, Button, Image, StyleSheet, TouchableHighlight, Switch, FlatList } from "react-native";
import StoreContext from "../../../../store/StoreContext";
import SegmentedControl from '@react-native-community/segmented-control';
import YouAreInvisible from "./YouAreInvisible"
import NoUsers from "./NoUsers"
import styled from "styled-components/native"; "../../../Authentication/Landing/node_modules/styled-components/native";
import useCurrentUser from "../../../../hooks/useCurrentUser"

const Explore = (props) => {
  const [appState, _] = useContext(StoreContext);
  const [currentUser, updateCurrentUser] = useCurrentUser()

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'NO_LOCAL_USERS':
          return {
            noUsers: true,
            loading: false,
            users: [],
            error: null,
            isVisible: true,
          };
        case 'LOCAL_USERS_FETCHED':
          return {
            users: action.payload,
            loading: false,
            noUsers: false,
            error: null,
            isVisible: true,
          };
        case 'ERROR':
          return {
            error: action.payload,
            loading: false,
            noUsers: false,
            users: [],
            isVisible: true,
          };
        case 'CHANGE_VISIBILITY':
          return {
            ...prevState,
            isVisible: action.payload,
            loading: false,
          };
        default:
          throw new Error(`UNKNOWN ACTION: ${action.type}`)
      }
    },
    {
      loading: true,
      error: null,
      noUsers: false,
      users: [],
      isVisible: currentUser.isVisible,
    }
  );

  const selectedSex = () => {
    console.log(currentUser)
    const sexcriteria = currentUser.showMeCriteria.sex
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

  const [location, setLocation] = useState({ latitude: 24.223008280105784, longitude: 23.135728247934946 });
  const [sex, setSex] = useState(selectedSex())
  const [formState, setFormState] = useState({ whatAmIDoing: currentUser.whatAmIDoing });

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const toggleSwitch = async () => {
    const user = await appState.userRepository.updateUser({ id: appState.user.id, isVisible: !state.isVisible })
    dispatch({ type: "CHANGE_VISIBILITY", payload: user.isVisible })
  }

  useEffect(() => {
    if (!state.isVisible) {
      dispatch({ type: "CHANGE_VISIBILITY", payload: state.isVisible })
      return
    }
  }, [])

  useEffect(() => {
    async function getUsers() {
      if (!state.isVisible) { return }
      try {
        const users = await appState.userRepository.updateLocationGetUsers({ id: appState.user.id, ...location })

        if (users.length === 0) {
          dispatch({ type: "NO_LOCAL_USERS" })
        } else {
          dispatch({ type: "LOCAL_USERS_FETCHED", payload: users })
        }
      } catch (e) {
        dispatch({ type: "ERROR", payload: JSON.stringify(e) })
      }
    }

    getUsers()
  }, [state.isVisible, sex])

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
    updateCurrentUser({ showMeCriteria: { sex: sexArray } })
  }

  useEffect(() => {
    props.navigation.setOptions({ title: appState.user?.name ? appState.user.firstname : "No Name" });
  }, [])

  async function submitWhatAmIDoing() {
    await appState.userRepository.updateUser({ id: appState.user.id, ...formState })
    updateCurrentUser({ ...formState })
  }

  if (state.loading) return <Text>"Loading..."</Text>
  if (state.error) return `Error! ${state.error}`;


  const renderItem = ({ item }) => {
    const user = item
    return (
      <TouchableHighlight onPress={(e) => props.navigation.navigate("UserProfile", { user })}>
        <View style={styles.user}>
          <Image source={{ uri: user.profileImageUrl }} style={styles.profileImg} />
          <Text style={styles.userName}>Name: {user.firstname}</Text>
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
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          <Image source={{ uri: appState.user.profileImageUrl }} style={styles.profileImg} />
        </View>
        <>
          <Text>{formState.whatAmIDoing}</Text>
          <Container>
            <Input
              onChangeText={(val) => setInput("whatAmIDoing", val)}
              onBlur={submitWhatAmIDoing}
              value={formState.whatAmIDoing}
              placeholder="What are you up to?"
            />
          </Container>
        </>
        <SegmentedControl
          values={['all', 'male', 'female']}
          selectedIndex={sex}
          onChange={(event) => {
            changeSex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
        <Text>isVisible: {state.isVisible}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={state.isVisible ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={state.isVisible}
        />
        <Text>VISIBILITY CONTROLS: AGE: {appState.user.showMeCriteria.age[0]} / {appState.user.showMeCriteria.age[1]} SEX: {appState.user.showMeCriteria.sex}</Text>
        <Text>{JSON.stringify(appState.user.showMeCriteria)}</Text>
      </View>
      {state.noUsers && <NoUsers />}
      <FlatList
        data={state.users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  user: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  userName: { fontSize: 18 },
  profileImgContainer: {
    margin: "auto",
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

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

export default Explore;
