import React from "react";
import EZAuthManager from "../service/authentication/AuthManager/EZAuthManager";
import AsyncStorage from "@react-native-community/async-storage";
import deleteUsers from "../utils/cleanup/delete-users";

describe("EZAuthManager", () => {

  let userSubs = [];

  beforeEach(async () => {
    AsyncStorage.clear();
  });

  afterEach(async () => {
    AsyncStorage.clear();
  });

  afterAll(() => {
    return deleteUsers(userSubs);
  });

  test("signs in and persists and existing user", async () => {
    const authManager = new EZAuthManager();

    const signUpResult = await authManager.signUp("newuser@g.com", "abc123!!");
    userSubs.push(signUpResult.userId);
    expect(typeof signUpResult.userId).toBe('string');
    expect(signUpResult.userId.length).toBeGreaterThan(1);

    const signInResult = await authManager.signIn("newuser@g.com", "abc123!!");
    expect(signInResult.token).toBe("fakeToken");
  });

});