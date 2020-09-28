import AsyncStorage from "@react-native-community/async-storage";
import AuthDataStore from "./AuthDataStore";

class AsyncStorageAuthDataStore implements AuthDataStore {
  constructor() {}
  async readAuthSession(
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ) {
    try {
      const jsonValue = await AsyncStorage.getItem("@authSession");
      const authSession = jsonValue != null ? JSON.parse(jsonValue) : null;
      onSuccess(authSession);
    } catch (e) {
      onFailure(`Error retrieving auth session from data store: ", ${e}`);
    }
  }

  async save(
    authSession: AuthSession,
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ) {
    try {
      const jsonValue = JSON.stringify(authSession);
      await AsyncStorage.setItem("@authSession", jsonValue);
      onSuccess(authSession);
    } catch (e) {
      onFailure(`Error saving auth session: ${e}`);
    }
  }

  async delete(
    onSuccess: (success: boolean) => void,
    onFailure: (error: string) => void
  ) {
    try {
      await AsyncStorage.removeItem("@authSession");
      onSuccess(true);
    } catch (error) {
      onFailure(`Error deleting auth session: ${error}`);
    }
  }
}

export default AsyncStorageAuthDataStore;
