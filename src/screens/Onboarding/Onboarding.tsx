import React from "react";
import { Text, View, SafeAreaView, Image, StyleSheet } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import OnboardingEmailPassword from "./OnboardingEmailPassword";
import OnboardingName from "./OnboardingName";

const slides = [
    {
        key: 'one',
        onboardingStep: "emailAndPassword"
    },
    {
        key: 'two',
        onboardingStep: "name"
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

const Onboarding = (props) => {
    const renderItem = ({ item }) => {
        const bgStyle = { backgroundColor: item.backgroundColor }
        switch (item.onboardingStep) {
            case "emailAndPassword":
                return <OnboardingEmailPassword />
            case "name":
                return <OnboardingName />
            default:
                throw Error("No onboarding screen")
        }
    };

    const onDone = () => {
        props.route.params.dispatch({ type: "IS_AUTHENTICATED" });
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

export default Onboarding;
