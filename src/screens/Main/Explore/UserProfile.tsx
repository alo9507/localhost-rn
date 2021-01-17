import React from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import StoreContext from "../../../store/StoreContext";

const UserProfile = (props) => {

    const user = props.route.params.user
    const isNod = props.route.params.isNod

    const [appState, setAppState] = React.useContext(StoreContext);

    const sendNod = async () => {
        if (isNod) {
            appState.userRepository.returnNod({
                from: appState.user.id,
                to: user.id,
                message: "nice ass bitch",
                latitude: 21.3,
                longitude: 21.3
            })
        } else {
            appState.userRepository.sendNod({
                from: appState.user.id,
                to: user.id,
                message: "nice ass bitch",
                latitude: 21.3,
                longitude: 21.3
            })
        }
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

    const renderWorkExperience = () => {
        return user.workExperience?.map((workExperience, index) => {
            console.log(workExperience)
            return (
                <View key={index} >
                    <Text>ogranizationName: {workExperience.organizationName}</Text>
                    <Text>title: {workExperience.title}</Text>
                    <Text>startYear: {workExperience.startYear}</Text>
                    <Text>endYear: {workExperience.endYear}</Text>
                </View>
            )
        })
    }

    const renderEducation = () => {
        return user.education?.map((education, index) => {
            return (
                <View key={index} >
                    <Text>{education.name}</Text>
                    <Text>{education.degree}</Text>
                    <Text>{education.focus}</Text>
                    <Text>{education.entryYear}</Text>
                    <Text>{education.graduationYear}</Text>
                </View>
            )
        })
    }

    return (
        <View style={styles.user}>
            <View style={styles.profileImgContainer}>
                <Image source={{ uri: user.profileImageUrl }} style={styles.profileImg} />
            </View>
            <Text style={styles.userName}>Name: {user.firstname} {user.lastname}</Text>
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
            <Text>hometown: {user.hometown}</Text>
            <Text>work: {renderWorkExperience()}</Text>
            <Text>schools: {renderEducation()}</Text>
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
    profileImgContainer: {
        margin: "auto",
    },
    profileImg: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
});

export default UserProfile;
