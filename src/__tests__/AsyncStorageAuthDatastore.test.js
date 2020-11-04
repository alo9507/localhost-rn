import React from "react";
import AsyncStorageAuthDataStore from "../service/authentication/AuthDataStore/AsyncStorageAuthDataStore"
import AsyncStorage from "@react-native-community/async-storage";

beforeEach(async () => {
    AsyncStorage.clear()
});

afterEach(async () => {
    AsyncStorage.clear()
});

test("correctly reads the AuthSession if it's persisted", async () => {
    const jsonValue = JSON.stringify({token: "fakeToken"});
    await AsyncStorage.setItem("@authSession", jsonValue);
    const authDatastore = new AsyncStorageAuthDataStore()
    
    const result = await authDatastore.readAuthSession()
    
    expect(result.token).toBe("fakeToken")
});

test("return null if there is no AuthSession persisted", async () => {
    const authDatastore = new AsyncStorageAuthDataStore()
    
    const result = await authDatastore.readAuthSession()
    
    expect(result).toBe(null)
});

test("save persists the authSession", async () => {
    const authDatastore = new AsyncStorageAuthDataStore()
    const nullResult = await authDatastore.readAuthSession()
    expect(nullResult).toBe(null)
    
    const authSession = {token: "fakeToken", userId: "fakeUserId"}
    authDatastore.save(authSession)

    const result = await authDatastore.readAuthSession()
    expect(result.token).toBe(authSession.token)
    expect(result.userId).toBe(authSession.userId)
});

test("delete removes the authSession", async () => {
    const authDatastore = new AsyncStorageAuthDataStore()
    const nullResult = await authDatastore.readAuthSession()
    expect(nullResult).toBe(null)
    
    const authSession = {token: "fakeToken", userId: "fakeUserId"}
    authDatastore.save(authSession)

    const result = await authDatastore.readAuthSession()
    expect(result.token).toBe(authSession.token)
    expect(result.userId).toBe(authSession.userId)

    await authDatastore.delete()
    const secondNullResult = await authDatastore.readAuthSession()
    expect(secondNullResult).toBe(null)
});