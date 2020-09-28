class MockAuthManager: AuthManager {
    authSession: AuthSession?
    authDataStore: AuthDataStore
    authProviderConfiguration: AuthProviderConfiguration

    function configure(authProviderConfiguration: AuthProviderConfiguration): void

    function remoteAuthProvider(): RemoteAuthProvider {
        return authProviderConfiguration.remoteAuthProvider
    }
}