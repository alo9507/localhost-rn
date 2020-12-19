import React from "react";
import { Text, View, SafeAreaView, Image, StyleSheet } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 'one',
        title: "Social Media Isn't Social Anymore",
        text: 'Description.\nSay something cool',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
        backgroundColor: '#59b2ab',
    },
    {
        key: 'two',
        title: 'Meet People.\nWhere You Are.\nRight Now.',
        text: 'Other cool stuff',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
        backgroundColor: '#febe29',
    },
    {
        key: 'three',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
        backgroundColor: '#22bcb5',
    }
];

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

const FirstLaunch = (props) => {
    const renderItem = ({ item }) => {
        const bgStyle = { backgroundColor: item.backgroundColor }
        return (
            <View style={[styles.slide, bgStyle]}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.text}>{item.thing}</Text>
            </View>
        );
    };

    const onDone = () => {
        props.route.params.dispatch({ type: "IS_ONBOARDING" });
    };

    const keyExtractor = (item) => item.title;

    return (
        <>
            <SafeAreaView style={styles.container}>
                <AppIntroSlider
                    renderItem={renderItem}
                    data={slides}
                    onDone={onDone}
                    keyExtractor={keyExtractor}
                />
            </SafeAreaView>
        </>
    );
};

export default FirstLaunch;
