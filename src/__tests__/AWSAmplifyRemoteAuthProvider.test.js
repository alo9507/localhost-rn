import React from "react";
import AWSAmplifyRemoteAuthProvider from "../service/authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import config from "../../aws-exports";
import Amplfiy from "aws-amplify";
import deleteUsers from "../utils/cleanup/delete-users";
const { v4: uuidv4 } = require('uuid');

Amplfiy.configure(config);

describe("AWSAmplifyRemoteAuthProviderTest", () => {
  let userSubs = [];

  afterAll(() => {
    return deleteUsers(userSubs);
  });

  test("successfully signs up new user", async () => {
    const awsAuthProvider = new AWSAmplifyRemoteAuthProvider();
    const userEmail = `new_user${uuidv4()}@g.com`;
    try {
      const authResult = await awsAuthProvider.signUp(userEmail, "abc123!!");
      userSubs.push(authResult.userId);
      expect(authResult.token).toBe("fakeToken");
      expect(typeof authResult.userId).toBe('string');
      expect(authResult.userId.length).toBeGreaterThan(1);

    } catch (e) {
      fail(e);
    }
  });

  test("successfully signs in user", async () => {
    const awsAuthProvider = new AWSAmplifyRemoteAuthProvider();
    const userEmail = `new_user${uuidv4()}@g.com`;
    try {
      const authResult = await awsAuthProvider.signUp(userEmail, "abc123!!");
      const userId = authResult.userId;
      userSubs.push(userId);

      expect(authResult.token).toBe("fakeToken");
      expect(typeof authResult.userId).toBe('string');
      expect(authResult.userId.length).toBeGreaterThan(1);

      const signInResult = await awsAuthProvider.signIn(userEmail, "abc123!!");
      expect(signInResult.token).toBe("fakeToken");
      expect(typeof signInResult.userId).toBe(userId);
    } catch (e) {
      fail(e);
    }
  });

  // ERRORS
  test("Sends an error of UserDoesNotExist:  User does not exist. if user does not exist", async () => {
    const awsAuthProvider = new AWSAmplifyRemoteAuthProvider();
    try {
      const authResult = await awsAuthProvider.signIn("IDONOTEXIST@g.com", "abc123!");
    } catch (e) {
      expect(e).toBe("UserDoesNotExist:  User does not exist.");
    }
  });

  test("Sends an error of IncorrectUsernameOrPassword if user exists", async () => {
    const awsAuthProvider = new AWSAmplifyRemoteAuthProvider();
    try {
      const authResult = await awsAuthProvider.signIn("IDONOTEXIST@g.com", "abc123!");
    } catch (e) {
      expect(e).toBe("UserDoesNotExist:  User does not exist.");
    }
  });
});
