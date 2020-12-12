import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import StoreContext from "../../../store/StoreContext";

const UserProfile = (props) => {

    const user = props.route.params.user
    console.log(user)

    const [appState, setAppState] = React.useContext(StoreContext);

    const sendNod = async () => {
        appState.userRepository.sendNod({
            from: appState.user.id,
            to: user.id,
            message: "nice ass bitch",
            latitude: 21.3,
            longitude: 21.3
        })
    }

    const report = async () => {
        appState.userRepository.report({
            from: appState.user.id,
            to: user.id,
            message: "nice ass bitch",
            reason: "Compton",
        })
    }

    const unmatch = async () => {
        appState.userRepository.unmatch({
            from: appState.user.id,
            to: user.id,
            message: "nice ass bitch",
            reason: "Compton"
        })
    }

    const becomeInvisibleTo = async () => {
        appState.userRepository.becomeInvisibleTo({
            from: appState.user.id,
            to: user.id
        })
    }

    const becomeVisibleTo = async () => {
        appState.userRepository.becomeVisibleTo({
            from: appState.user.id,
            to: user.id
        })
    }

    return (
        <View style={styles.user}>
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
            <Button title="Send Nod" onPress={sendNod} />
            <Button title="Report" onPress={report} />
            <Button title="Become Invisible To" onPress={becomeInvisibleTo} />
            <Button title="Unmatch" onPress={unmatch} />
            <Button title="Become Visible To" onPress={becomeVisibleTo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    user: { marginBottom: 15 },
    input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
    userName: { fontSize: 18 },
});

export default UserProfile;
