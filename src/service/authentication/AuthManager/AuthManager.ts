import AuthSession from "../AuthSession/AuthSession";
import AuthDataStore from "../AuthDataStore/AuthDataStore"

interface AuthManager {
    authSession: AuthSession | null
    authDataStore: AuthDataStore

    signUp(email: string, password: string): Promise<AuthSession>
    signIn(email: string, password: string): Promise<AuthSession>
    signOut(): Promise<boolean>
    checkForAuthSession(): Promise<AuthSession | null>
}

export default AuthManager