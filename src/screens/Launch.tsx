import React, { useEffect, useState } from "react";
import { Text, Button, View } from "react-native";
import StoreContext from "../store/StoreContext";
import AuthSession from "../service/authentication/AuthSession/AuthSession"
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import AsyncStorageFirstLaunchService from "../service/first-launch-service/AsyncStorageFirstLaunchService"

const LaunchScreen = (props) => {

  return (
    <View>
      <Text>FIRST LAUNCH SCREEN</Text>
    </View>
  );
};

export default LaunchScreen;
