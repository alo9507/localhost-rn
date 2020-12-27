import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Splash = (props) => {

    return (
        <View style={styles.container}>
            <Text>localhost</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: "#4450C7"
    },
});

export default Splash;
