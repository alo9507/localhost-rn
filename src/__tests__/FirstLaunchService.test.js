import React from "react";
import AsyncStorageFirstLaunchService from "../service/first-launch-service/AsyncStorageFirstLaunchService"
import AsyncStorage from "@react-native-community/async-storage";

beforeEach(async () => {
    AsyncStorage.clear()
});

afterEach(async () => {
    AsyncStorage.clear()
});

test("correctly detects when it IS a first launch", async () => {
  const fls = new AsyncStorageFirstLaunchService()
  const result = await fls.isFirstLaunch()
  expect(result).toBe(true)
});

test("correctly detects when it IS NOT a first launch", async () => {
    await AsyncStorage.setItem("@firstLaunchToken", JSON.stringify({ isFirstLaunch: false }));
    const fls = new AsyncStorageFirstLaunchService()
    const result = await fls.isFirstLaunch()
    expect(result).toBe(false)
});
