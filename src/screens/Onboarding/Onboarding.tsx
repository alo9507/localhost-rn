import React, { useRef, useContext } from "react";
import { StyleSheet } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import PhoneNumber from "../Authentication/PhoneNumberSignUp";
import ConfirmPhoneNumber from "../Authentication/ConfirmPhoneNumber";
import OnboardingLocation from "./OnboardingLocation";
import OnboardingName from "./OnboardingName";
import StoreContext from "../../store/StoreContext"
import OnboardingSex from "./OnboardingSex";
import OnboardingAge from "./OnboardingAge"

const slides = [
    {
        key: 'zero',
        slideNumber: 0,
        onboardingStep: "phonenumber",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'one',
        slideNumber: 1,
        onboardingStep: "confirmPhonenumber",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'two',
        slideNumber: 2,
        onboardingStep: "name",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'three',
        slideNumber: 3,
        onboardingStep: "sex",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'foure',
        slideNumber: 4,
        onboardingStep: "age",
        backgroundColor: '#FFFACC',
    },
    {
        key: 'five',
        slideNumber: 5,
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
    const [appState, setAppState] = useContext(StoreContext)

    const renderItem = ({ item }) => {
        switch (item.onboardingStep) {
            case "phonenumber":
                return <PhoneNumber item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "confirmPhonenumber":
                return <ConfirmPhoneNumber item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "name":
                return <OnboardingName item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "sex":
                return <OnboardingSex item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "age":
                return <OnboardingAge item={item} goToNext={goToNext} slideNumber={item.slideNumber} />
            case "location":
                return <OnboardingLocation item={item} goToNext={goToNext} slideNumber={item.slideNumber} startHosting={() => appState.dispatch({ type: "IS_AUTHENTICATED" })} />
            default:
                throw Error("No onboarding screen")
        }
    };

    const onDone = () => {
        appState.dispatch({ type: "IS_AUTHENTICATED" });
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
