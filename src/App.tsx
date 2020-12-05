import React, { useEffect, useState } from "react";

import { registerRootComponent } from "expo";

import { NavigationContainer } from "@react-navigation/native";
import StoreProvider from "./store/StoreProvider";
import MainTabNavigatorStack from "./screens/MainTabNavigator/MainTabNavigator"
import LaunchStackScreens from "./screens/FirstLaunch/FirstLaunchNavigator"
import LoginStackScreens from "./screens/Authentication/Authentication"

import StoreContext from "./store/StoreContext";
import AuthSession from "./service/authentication/AuthSession/AuthSession"
import EZAuthManager from "./service/authentication/AuthManager/EZAuthManager";
import AsyncStorageFirstLaunchService from "./service/first-launch-service/AsyncStorageFirstLaunchService"


const App = (props) => {

  const [appState, setAppState] = React.useContext(StoreContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const authManager = new EZAuthManager();

  const [authSession, setAuthSession] = useState("No auth session")

  const determineFirstLaunch = async () => {
    const fls = new AsyncStorageFirstLaunchService()
    const isFirstLaunch = await fls.isFirstLaunch()
    return isFirstLaunch
  }

  const determineIsLoggedIn = async () => {
    const authSession: AuthSession | null = await authManager.checkForAuthSession()
    if (authSession != null) {
      console.log(`Auth Session found: ${JSON.stringify(authSession)}. Fetching user...`)
      setAuthSession(JSON.stringify(authSession))
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
          setIsLoading(false)
          setIsAuthenticated(false)
          setIsFirstLaunch(true)
        }

        const isLoggedIn = await determineIsLoggedIn()
        if (isLoggedIn) {
          setIsLoading(false)
          setIsAuthenticated(true)
          setIsFirstLaunch(false)
        } else {
          setIsLoading(false)
          setIsAuthenticated(false)
          setIsFirstLaunch(false)
        }
      } catch (e) {
        console.log(`An error occured while determining first screen: ${e}`);
      }
    }

    determineFirstScreen()
  }, []);

  async function clearAuthCache() {
    try {
      const cleared = await appState.authManager.clearAuthSession()
      if (cleared) {
        console.log("Cleared auth session")
      } else {
        console.log("Failed to clear auth session")
      }
    } catch (e) {
      console.log("Error Clearing Auth Cache:", e);
    }
  }

  if (isFirstLaunch) {
    return (
      <StoreProvider>
        <NavigationContainer >
          <LaunchStackScreens />
        </NavigationContainer>
      </StoreProvider>
    );
  }

  if (isAuthenticated) {
    return (
      <StoreProvider>
        <NavigationContainer >
          <MainTabNavigatorStack />
        </NavigationContainer>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider>
      <NavigationContainer >
        <LoginStackScreens />
      </NavigationContainer>
    </StoreProvider>
  );

};

registerRootComponent(App);
