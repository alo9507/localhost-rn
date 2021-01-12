import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

const FirstLaunchScreen = (props) => {
    const { item, startHosting } = props
    const bgStyle = { backgroundColor: item.backgroundColor }

    const goToOnboarding = () => {
        props.dispatch({ type: "IS_ONBOARDING" });
    }

    const [response, setResponse] = useState("")

    return (
        <View style={[styles.slide, bgStyle]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.text}>{item.thing}</Text>
            {startHosting ? <Button title="start hosting?" onPress={goToOnboarding} /> : <View></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        // color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        // color: 'white',
        textAlign: 'center',
    },
    container: { flex: 1 },
});

export default FirstLaunchScreen;
