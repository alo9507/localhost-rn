interface RemoteAuthProvider {
  async signIn(email: string, password: string): Promise<AuthSession>
  async signIn(): Promise<AuthSession>
  async signUp(email: string, password: string): Promise<AuthSession>
}
