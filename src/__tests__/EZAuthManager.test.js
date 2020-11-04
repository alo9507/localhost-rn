import React from "react";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager"
import AsyncStorage from "@react-native-community/async-storage";

beforeEach(async () => {
    AsyncStorage.clear()
});

afterEach(async () => {
    AsyncStorage.clear()
});

test("signs in and persists and existing user", async () => {
  const authManager = new EZAuthManager()
  const result = await authManager.signIn("newuser@g.com", "abc123!!")
  expect(result.token).toBe("fakeToken")
});
