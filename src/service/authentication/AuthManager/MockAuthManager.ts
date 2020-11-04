class MockAuthManager implements AuthManager {
    authSession: AuthSession | undefined
    authDataStore: AuthDataStore
    authProviderConfiguration: AuthProviderConfiguration

    configure(authProviderConfiguration: AuthProviderConfiguration): void

    remoteAuthProvider(): RemoteAuthProvider {
        return authProviderConfiguration.remoteAuthProvider
    }
}