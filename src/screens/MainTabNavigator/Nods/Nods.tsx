import React, { useEffect, useState } from "react";
import { Text, TouchableHighlight, StyleSheet, View } from "react-native";
import StoreContext from "../../../store/StoreContext";
import User from "../../../models/User"

const Nods = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    type Nod = {
        createdAt: number,
        latitude: number,
        longitude: number,
        message: string,
        initiator: boolean,
        seen: boolean
    }

    type UserWithNods = {
        user: User
        nod: Nod
    }

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

    const [state, setState] = useState(initial)

    useEffect(() => {
        async function getIncomingNods() {
            try {
                const incomingUsersWithNods = await appState.userRepository.getIncomingNods(appState.user.id)
                setState({ ...state, userWithNods: incomingUsersWithNods, loading: false })
            } catch (e) {
                setState({ ...state, loading: false, error: e })
            }
        }

        getIncomingNods()
    }, [])

    if (state.loading) return <Text>"Loading..."</Text>
    if (state.error) return `Error! ${state.error}`;

    return (
        <>
            {state.userWithNods.map((userWithNod, index) => (
                <TouchableHighlight onPress={(e) => props.navigation.navigate("UserProfile", { user: userWithNod.user })}>
                    <View key={userWithNod.user.id ? userWithNod.user.id : index} style={styles.user}>
                        <Text>{userWithNod.nod.message}</Text>
                        <Text style={styles.userName}>Name: {userWithNod.user.name}</Text>
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
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    user: { marginBottom: 15 },
    input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
    userName: { fontSize: 18 },
});

export default Nods;
