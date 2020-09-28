interface AuthDataStore {
  readAuthSession(
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ): void;

  save(
    authSession: AuthSession,
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ): void;

  delete(
    onSuccess: (success: boolean) => void,
    onFailure: (error: string) => void
  ): void;
}
