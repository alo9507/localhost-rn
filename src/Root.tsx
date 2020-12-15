// Foundation
import React, { useEffect, useReducer, useContext, useRef } from "react";

// State
import StoreProvider from "./store/StoreProvider";
import StoreContext from "./store/StoreContext";

// Navigation
import { NavigationContainer } from "@react-navigation/native";

// Services
import AuthSession from "./service/authentication/AuthSession/AuthSession"
import AsyncStorageFirstLaunchService from "./service/first-launch-service/AsyncStorageFirstLaunchService"

// Screens
import MainTabNavigator from "./screens/MainTabNavigator/MainTabNavigator"
import LaunchStackScreens from "./screens/FirstLaunch/FirstLaunchNavigator"
import LoginStackScreens from "./screens/Authentication/Authentication"
import SplashStackScreens from "./screens/Splash/SplashStack"

const Root = () => {
    const [appState, setAppState] = useContext(StoreContext)

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'IS_FIRST_LAUNCH':
                    return {
                        isFirstLaunch: true,
                        isLoading: false,
                        isAuthenticated: false,
                    };
                case 'IS_AUTHENTICATED':
                    return {
                        isLoading: false,
                        isAuthenticated: true,
                        isFirstLaunch: false,
                    };
                case 'IS_NOT_AUTHENTICATED':
                    return {
                        isLoading: false,
                        isAuthenticated: false,
                        isFirstLaunch: false,
                    };
            }
        },
        {
            isLoading: true,
            isAuthenticated: false,
            isFirstLaunch: false,
        }
    );

    const determineFirstLaunch = async () => {
        const fls = new AsyncStorageFirstLaunchService()
        const isFirstLaunch = await fls.isFirstLaunch()
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
        console.log("root App state: ", appState)

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

    const firstScreen = () => {
        if (state?.isLoading) {
            return <SplashStackScreens />
        } else if (state?.isFirstLaunch) {
            return <LaunchStackScreens />
        } else if (state?.isAuthenticated) {
            return <MainTabNavigator dispatch={dispatch} />
        } else {
            return <LoginStackScreens dispatch={dispatch} />
        }
    }

    return (
        <NavigationContainer >
            {firstScreen()}
        </NavigationContainer>
    )
};

export default Root
