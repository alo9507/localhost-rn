// Foundation
import React, { useEffect, useReducer, useContext } from "react";

// State
import StoreProvider from "./store/StoreProvider";
import StoreContext from "./store/StoreContext";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Services
import AuthSession from "./service/authentication/AuthSession/AuthSession"
import AsyncStorageFirstLaunchService from "./service/first-launch-service/AsyncStorageFirstLaunchService"

// Screens
import MainTabNavigatorStack from "./screens/MainTabNavigator/MainTabNavigator"
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
            console.log(`Auth Session found: ${JSON.stringify(authSession)}. Fetching user...`)
            const user = await appState.userRepository.getUser(authSession.userId)
            setAppState({ ...appState, user });
            return true
        } else {
            console.log(`No auth session stored in cache`)
            return false
        }
    }

    useEffect(() => {
        const determineFirstScreen = async () => {
            try {
                const isFirstLaunch = await determineFirstLaunch()
                if (isFirstLaunch) {
                    console.log("IS FIRST")
                    dispatch({ type: "IS_FIRST_LAUNCH" })
                    return
                }

                const isLoggedIn = await determineIsLoggedIn()
                if (isLoggedIn) {
                    dispatch({ type: "IS_AUTHENTICATED" })
                } else {
                    dispatch({ type: "IS_NOT_AUTHENTICATED" })
                }
            } catch (e) {
                console.log(`An error occured while determining first screen: ${e}`);
            }
        }

        determineFirstScreen()
    }, []);

    const Stack = createStackNavigator()

    return (
        <StoreProvider>
            <NavigationContainer >
                {state?.isLoading ? (<SplashStackScreens />)
                    : state?.isFirstLaunch ? (<LaunchStackScreens />)
                        : state?.isAuthenticated ? (<MainTabNavigatorStack dispatch={dispatch} />)
                            : (<LoginStackScreens dispatch={dispatch} />)}
            </NavigationContainer>
        </StoreProvider>
    )
};

export default Root
