import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import StoreContext from "../store/StoreContext";
import AuthSession from "../service/authentication/AuthSession/AuthSession"
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import AsyncStorageFirstLaunchService from "../service/first-launch-service/AsyncStorageFirstLaunchService"

const LaunchScreen = (props) => {
  const [appState, setAppState] = React.useContext(StoreContext);

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
    (async function determineFirstScreen() {
      try {
        const isFirstLaunch = await determineFirstLaunch()

        if (isFirstLaunch) {
          return props.navigation.navigate("FirstLaunch");
        }

        const isLoggedIn = await determineIsLoggedIn()
        if (isLoggedIn) {
          return props.navigation.navigate("LocalUsers");
        } else {
          return props.navigation.navigate("Login");
        }
      } catch (e) {
        console.log(`An error occured while determining first screen: ${e}`);
      }
    })();
  }, []);

  return (
    <>
      <Text>LAUNCH SCREEN</Text>
      <Text>Auth Session: {authSession}</Text>
    </>
  );
};

export default LaunchScreen;
