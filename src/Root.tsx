// Foundation
import React, { useEffect, useReducer, useContext, useRef } from "react";

// State
import StoreProvider from "./store/StoreProvider";
import StoreContext from "./store/StoreContext";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

// Services
import AuthSession from "./service/authentication/AuthSession/AuthSession"

// Screens
import MainTabNavigator from "./screens/Main/MainTabNavigator"
import LaunchStackScreens from "./screens/FirstLaunch/FirstLaunchNavigator"
import LandingStackNavigator from "./screens/Landing/LandingStackNavigator"
import SplashStackScreens from "./screens/Splash/SplashStack"
import OnboardingNavigator from "./screens/Onboarding/OnboardingNavigator"

const Root = () => {
    const [appState, setAppState] = useContext(StoreContext)

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'IS_FIRST_LAUNCH':
                    return {
                        isLoading: false,
                        isFirstLaunch: true,
                        isAuthenticated: false,
                        isOnboarding: false
                    };
                case 'IS_AUTHENTICATED':
                    return {
                        isLoading: false,
                        isFirstLaunch: false,
                        isAuthenticated: true,
                        isOnboarding: false
                    };
                case 'IS_NOT_AUTHENTICATED':
                    return {
                        isLoading: false,
                        isFirstLaunch: false,
                        isAuthenticated: false,
                        isOnboarding: false
                    };
                case 'IS_ONBOARDING':
                    return {
                        isLoading: false,
                        isFirstLaunch: false,
                        isAuthenticated: false,
                        isOnboarding: true
                    };

            }
        },
        {
            isLoading: true,
            isFirstLaunch: false,
            isAuthenticated: false,
            isOnboarding: false
        }
    );

    const determineFirstLaunch = async () => {
        const isFirstLaunch = await appState.firstLaunchService.isFirstLaunch()
        return isFirstLaunch
    }

    const determineIsLoggedIn = async () => {
        const authSession: AuthSession | null = await appState.authManager.checkForAuthSession()
        if (authSession != null) {
            const user = await appState.userRepository.getUser(authSession.userId)

            return { user, isAuthenticated: true }
        } else {
            console.log(`No auth session stored in cache`)
            return { user: null, isAuthenticated: false }
        }
    }

    const determineFirstScreen = async () => {
        if (appState.goToMain) { return dispatch({ type: "IS_AUTHENTICATED" }) }
        if (appState.goToOnboarding) { return dispatch({ type: "IS_ONBOARDING" }) }

        try {
            const isFirstLaunch = await determineFirstLaunch()
            if (isFirstLaunch) {
                dispatch({ type: "IS_FIRST_LAUNCH" })
                return
            }
        } catch (e) {
            console.log(`An error occured while determining first launch: ${e}`);
        }

        let user = null
        let isAuthenticated = false
        try {
            const result = await determineIsLoggedIn()
            user = result.user
            isAuthenticated = result.isAuthenticated
        } catch (e) {
            console.log(`An error occured while determining first authentication: ${e}`);
        }

        setAppState({ type: "UPDATE_USER", payload: user })

        if (isAuthenticated) {
            dispatch({ type: "IS_AUTHENTICATED" })
            return
        } else {
            dispatch({ type: "IS_NOT_AUTHENTICATED" })
            return
        }
    }

    useEffect(() => {
        determineFirstScreen()
    }, [])

    const currentScreen = () => {
        if (state?.isLoading) {
            return <SplashStackScreens />
        } else if (state?.isFirstLaunch) {
            return <LaunchStackScreens dispatch={dispatch} />
        } else if (state?.isAuthenticated) {
            return <MainTabNavigator dispatch={dispatch} />
        } else if (state?.isOnboarding) {
            return <OnboardingNavigator dispatch={dispatch} />
        } else {
            return <LandingStackNavigator dispatch={dispatch} />
        }
    }

    return (
        <NavigationContainer >
            {currentScreen()}
        </NavigationContainer>
    )
};

export default Root
