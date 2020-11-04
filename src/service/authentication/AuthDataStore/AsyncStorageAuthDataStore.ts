import AsyncStorage from "@react-native-community/async-storage";
import AuthDataStore from "./AuthDataStore";
import AuthSession from "../AuthSession/AuthSession"

class AsyncStorageAuthDataStore implements AuthDataStore {
  constructor () { }

  async readAuthSession(): Promise<AuthSession | null> {
    let promise: Promise<AuthSession | null> = new Promise(async (resolve, reject) => {
      try {
        const jsonValue = await AsyncStorage.getItem("@authSession");
        const authSession = jsonValue != null ? JSON.parse(jsonValue) : null;
        resolve(authSession);
      } catch (e) {
        reject(`Error retrieving auth session from data store: ", ${e}`);
      }
    })
    return promise
  }

  async save(authSession: AuthSession): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const jsonValue = JSON.stringify(authSession);
        await AsyncStorage.setItem("@authSession", jsonValue);
        resolve(authSession);
      } catch (e) {
        reject(`Error saving auth session: ${e}`);
      }
    })
    return promise
  }

  async delete(): Promise<boolean> {
    let promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem("@authSession");
        resolve(true);
      } catch (error) {
        reject(`Error deleting auth session: ${error}`);
      }
    })
    return promise
  }
}

export default AsyncStorageAuthDataStore;
