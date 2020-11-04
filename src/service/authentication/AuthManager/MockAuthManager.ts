import AuthDataStore from "../AuthDataStore/AuthDataStore";
import AuthSession from "../AuthSession/AuthSession";
import AuthManager from "./AuthManager";

class MockAuthManager implements AuthManager {
    authSession: AuthSession | null = null;
    authDataStore: AuthDataStore;

    constructor ($authDataStore: AuthDataStore) {
        this.authDataStore = $authDataStore;
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
            let mockAuthSession = new AuthSession("userId", "fakeToken")
            resolve(mockAuthSession)
        })
        return promise
    }
}

export default MockAuthManager