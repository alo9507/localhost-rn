import AuthSession from "../AuthSession/AuthSession";

interface AuthDataStore {
  readAuthSession(): Promise<AuthSession | null>;
  save(authSession: AuthSession): Promise<AuthSession | null>;
  delete(): Promise<boolean>
}

export default AuthDataStore
