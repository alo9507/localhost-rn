import AWSAmplifyRemoteAuthProvider from "../RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import AsyncStorageAuthDataStore from "../AuthDataStore/AsyncStorageAuthDataStore";
import { resolvePlugin } from "@babel/core";

class EZAuthManager implements AuthManager {
  authSession: AuthSession;
  authDataStore: AuthDataStore;
  remoteAuthProvider: RemoteAuthProvider;

  constructor() {
    this.authDataStore = new AsyncStorageAuthDataStore();
    this.remoteAuthProvider = new AWSAmplifyRemoteAuthProvider();
    this.authSession = null;
  }

  async signUp(email: string, password: string): Promise<AuthSession> {
    let promise = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.remoteAuthProvider.signUp(email, password)
        const authDataStoreResult = await this.authDataStore.save(authSession)
        this.authSession = authSession;
        resolve(authSession);
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async signIn(email: string, password: string): Promise<AuthSession> {
    let promise = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.remoteAuthProvider.signIn(email, password)
        const authDataStoreResult = await this.authDataStore.save(authSession)
        this.authSession = authSession;
        resolve(authSession)
      } catch (e) {
        console.log(e[0])
        reject(e)
      }
    })
    return promise
  }

  async signOut(): Promise<string> {
    let promise = new Promise(async (resolve, reject) => {
      try {
        const result = await this.remoteAuthProvider.signOut()
        const deleteResult = await this.authDataStore.delete()
        this.authSession = null
        resolve("successfully signed out")
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async checkForAuthSession() {
    let promise = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.authDataStore.readAuthSession()
        resolve(authSession)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }
}

export default EZAuthManager;
