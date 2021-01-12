import AuthDataStore from "../AuthDataStore/AuthDataStore";
import AuthSession from "../AuthSession/AuthSession";
import AuthManager from "./AuthManager";
import AsyncStorageAuthDataStore from "../AuthDataStore/AsyncStorageAuthDataStore";

class MockAuthManager implements AuthManager {
    authSession: AuthSession | null = null;
    authDataStore: AuthDataStore;
    isAuthenticated: boolean

    constructor (isAuthenticated: boolean,) {
        this.authDataStore = new AsyncStorageAuthDataStore();
        this.isAuthenticated = isAuthenticated
    }

    signIn(email: string, password: string): Promise<AuthSession> {
        let promise: Promise<AuthSession> = new Promise((resolve, reject) => {
            let mockAuthSession = new AuthSession("userId", "fakeToken")
            resolve(mockAuthSession)
        })
        return promise
    }

    signUp(email: string, password: string): Promise<AuthSession> {
        let promise: Promise<AuthSession> = new Promise((resolve, reject) => {
            let mockAuthSession = new AuthSession("userId", "fakeToken")
            resolve(mockAuthSession)
        })
        return promise
    }

    signOut(): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            let mockAuthSession = new AuthSession("userId", "fakeToken")
            resolve(true)
        })
        return promise
    }

    checkForAuthSession(): Promise<AuthSession | null> {
        let promise: Promise<AuthSession | null> = new Promise((resolve, reject) => {
            if (this.isAuthenticated) {
                let mockAuthSession = new AuthSession("userId", "fakeToken")
                resolve(mockAuthSession)
            } else {
                resolve(null)
            }
        })
        return promise
    }

    confirmSignUp(username: string, code: string): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            resolve(true)
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

export default MockAuthManager