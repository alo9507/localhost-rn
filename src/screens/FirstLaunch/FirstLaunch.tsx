import React, { useRef, useContext } from "react";
import { Text, View, SafeAreaView, Image, StyleSheet } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import FirstLaunchScreen from "./FirstLaunchScreen"
import StoreContext from "../../store/StoreContext"

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
        title: 'Show what you want to show',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
        backgroundColor: '#22bcb5',
    },
    {
        key: 'four',
        title: 'Start hosting?',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
        backgroundColor: '#22bcb5',
    }
];

const FirstLaunch = (props) => {
    const [appState, setAppState] = useContext(StoreContext)

    const renderItem = ({ item }) => {
        switch (item.key) {
            case "one":
                return <FirstLaunchScreen item={item} startHosting={false} />
            case "two":
                return <FirstLaunchScreen item={item} startHosting={false} />
            case "three":
                return <FirstLaunchScreen item={item} startHosting={false} />
            case "four":
                return <FirstLaunchScreen item={item} startHosting={true} />
            default:
                throw Error("No first launch screen")
        }
    };

    const onDone = () => {
        appState.dispatch({ type: "IS_ONBOARDING" });
    };

    const keyExtractor = (item) => item.title;

    const slider = useRef();

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

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default FirstLaunch;
