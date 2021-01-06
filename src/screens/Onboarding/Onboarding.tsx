import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import OnboardingPhoneNumber from "./OnboardingPhoneNumber";
import OnboardingConfirmPhoneNumber from "./OnboardingConfirmPhoneNumber";
import OnboardingLocation from "./OnboardingLocation";
import OnboardingName from "./OnboardingName";

const slides = [
    {
        key: 'one',
        slideNumber: 0,
        onboardingStep: "phonenumber",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'key',
        slideNumber: 0,
        onboardingStep: "confirmPhonenumber",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'two',
        slideNumber: 1,
        onboardingStep: "name",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'three',
        slideNumber: 2,
        onboardingStep: "location",
        backgroundColor: '#FFFACC',
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
        switch (item.onboardingStep) {
            case "phonenumber":
                return <OnboardingPhoneNumber item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "confirmPhonenumber":
                return <OnboardingConfirmPhoneNumber item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "name":
                return <OnboardingName item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "location":
                return <OnboardingLocation item={item} goToNext={goToNext} slideNumber={item.slideNumber} startHosting={() => props.route.params.dispatch({ type: "IS_AUTHENTICATED" })} />
            default:
                throw Error("No onboarding screen")
        }
    };

    const onDone = () => {
        props.route.params.dispatch({ type: "IS_AUTHENTICATED" });
    };

    const keyExtractor = (item) => item.title;

    const slider = useRef();

    const goToNext = (currentIndex) => {
        slider.current.goToSlide(currentIndex + 1, true)
    }

    return (
        <>
            <AppIntroSlider
                renderItem={renderItem}
                data={slides}
                onDone={onDone}
                keyExtractor={keyExtractor}
                ref={(ref) => (slider.current = ref)}
            />
        </>
    );
};

export default Onboarding;
