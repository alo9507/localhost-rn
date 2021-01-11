import React, { useEffect, useReducer } from "react";
import { Text, TouchableHighlight, Image, StyleSheet, View, FlatList } from "react-native";
import StoreContext from "../../../store/StoreContext";
import { Nod, UserWithNods } from "./models/Nod"

const Nods = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    type NodsInitialState = {
        loading: boolean,
        error: boolean,
        userWithNods: UserWithNods[],
    }

    const initial: NodsInitialState = {
        userWithNods: [],
        loading: true,
        error: false
    }

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'INCOMING_NODS_RECEIVED':
                    return {
                        ...prevState, userWithNods: action.payload, loading: false
                    };
                case 'ERROR':
                    return {
                        ...prevState, error: action.payload, loading: false
                    };
                case 'NOD_SEEN':
                    console.log(prevState.userWithNods)
                    let usersWithNodsClone = [...prevState.userWithNods]
                    const index = usersWithNodsClone.findIndex(element => element.user.id === action.payload.user.id);
                    console.log(usersWithNodsClone[index].nod)
                    usersWithNodsClone[index] = { user: usersWithNodsClone[index].user, nod: { ...usersWithNodsClone[index].nod, seen: true } }
                    return {
                        ...prevState, userWithNods: usersWithNodsClone
                    };
                default:
                    throw new Error(`Unsupported action type: ${action.type}`);
            }
        },
        initial
    );

    useEffect(() => {
        async function getIncomingNods() {
            try {
                const incomingUsersWithNods = await appState.userRepository.getIncomingNods(appState.user.id)
                dispatch({ type: 'INCOMING_NODS_RECEIVED', payload: incomingUsersWithNods })
            } catch (e) {
                dispatch({ type: 'ERROR', payload: e })
            }
        }

        getIncomingNods()
    }, [])

    const userClicked = (userWithNod) => {
        appState.userRepository.nodSeen({ recipient: appState.user.id, sender: userWithNod.user.id })
        dispatch({ type: "NOD_SEEN", payload: userWithNod })
        props.navigation.navigate("UserProfile", { user: userWithNod.user, isNod: true })
    }

    if (state.loading) return <Text>"Loading..."</Text>
    if (state.error) return `Error! ${state.error}`;

    if (state.userWithNods.length === 0) return (
        <>
            <Text>No new nods you worthless fuck!</Text>
        </>
    )

    const renderItem = ({ item }) => {
        const userWithNod = item
        return (
            <TouchableHighlight onPress={(e) => userClicked(userWithNod)}>
                <View style={styles.user}>
                    <Image source={{ uri: userWithNod.user.profileImageUrl }} style={styles.profileImg} />
                    <Text>{userWithNod.nod.seen ? "Seen" : "New Nod!"}</Text>
                    <Text>{userWithNod.nod.message}</Text>
                    <Text>Created At: {userWithNod.nod.createdAt}</Text>
                    <Text style={styles.userName}>Name: {userWithNod.user.firstname}</Text>
                    <Text>ID: {userWithNod.user.id}</Text>
                    <Text>bio: {userWithNod.user.bio}</Text>
                    <Text>whatAmIDoing: {userWithNod.user.whatAmIDoing}</Text>
                    <Text>isVisible: {userWithNod.user.isVisible}</Text>
                    <Text>sex: {userWithNod.user.sex}</Text>
                    <Text>age: {userWithNod.user.age}</Text>
                    <Text>email: {userWithNod.user.email}</Text>
                    <Text>latitude: {userWithNod.user.latitude}</Text>
                    <Text>longitude: {userWithNod.user.longitude}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <>
            <FlatList
                data={state.userWithNods}
                renderItem={renderItem}
                keyExtractor={item => item.user.id}
            />
        </>
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

export default Nods;
