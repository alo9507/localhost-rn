import LocalhostRemoteAuthProvider from "../RemoteAuthProvider/LocalhostRemoteAuthProvider";
import AsyncStorageAuthDataStore from "../AuthDataStore/AsyncStorageAuthDataStore";
import AuthSession from "../AuthSession/AuthSession"
import AuthManager from "../AuthManager/AuthManager"
import RemoteAuthProvider from "../RemoteAuthProvider/RemoteAuthProvider"
import AuthDataStore from "../../authentication/AuthDataStore/AuthDataStore"

class EZAuthManager implements AuthManager {
  authSession: AuthSession | null;
  authDataStore: AuthDataStore;
  remoteAuthProvider: RemoteAuthProvider;

  constructor () {
    this.authDataStore = new AsyncStorageAuthDataStore();
    this.remoteAuthProvider = new LocalhostRemoteAuthProvider();
    this.authSession = null;
  }

  resendConfirmationCode(username: string): Promise<boolean> {
    let promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        const response = await this.remoteAuthProvider.resendConfirmationCode(username)
        resolve(response);
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async signUp(phoneNumber: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const response = await this.remoteAuthProvider.signUp(phoneNumber)
        resolve(response);
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async signIn(email: string, password: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.remoteAuthProvider.signIn(email, password)
        const authDataStoreResult = await this.authDataStore.save(authSession)
        this.authSession = authSession;
        resolve(authSession)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async signOut(): Promise<boolean> {
    let promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.remoteAuthProvider.signOut()
        const deleteResult = await this.authDataStore.delete()
        this.authSession = null
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async checkForAuthSession(): Promise<AuthSession | null> {
    let promise: Promise<AuthSession | null> = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.authDataStore.readAuthSession()
        resolve(authSession)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  async clearAuthSession(): Promise<boolean | null> {
    let promise: Promise<boolean | null> = new Promise(async (resolve, reject) => {
      try {
        const authSession = await this.authDataStore.delete()
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  confirmSignUp(username: string, code: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const success = await this.remoteAuthProvider.confirmSignUp(username, code)
        const authSession = await this.remoteAuthProvider.signIn(username, "Abc123!!")
        const authDataStoreResult = await this.authDataStore.save(authSession)
        this.authSession = authSession;
        resolve(authSession);
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  forgotPassword(username: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export default EZAuthManager;
