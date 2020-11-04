import AuthSession from "../AuthSession/AuthSession";

interface AuthManager {
    readonly authSession: AuthSession | undefined
    readonly authDataStore: AuthDataStore
    readonly authProviderConfiguration: AuthProviderConfiguration

    configure(authProviderConfiguration: AuthProviderConfiguration): void

    async signIn(email: string, password: string, onSuccess: (authSession: AuthSession) => void, onFailure: (error: string) => void): void;
    async signOut(onSuccess: (success: boolean) => void, onFailure: (error: string) => void): void;
    async checkForAuthSession(onSuccess: (authSession: AuthSession?) => void, onFailure: (error: String) => void): void
}