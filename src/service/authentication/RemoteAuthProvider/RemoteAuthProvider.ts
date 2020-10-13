interface RemoteAuthProvider {
  async signIn(email: string, password: string, onSuccess: (authSession: AuthSession), onFailure: (error: string)): void;
  async signOut(onSuccess: (success: boolean), onFailure: (error: string)): void;
  async signUp(email: string, password: string, onSuccess: (authSession: AuthSession), onFailure: (error: string)): void;
}
