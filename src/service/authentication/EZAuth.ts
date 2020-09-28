class EZAuth {
    // 1: A singleton AuthManager instance
    static public let manager: AuthManager = EZAuthManager()

    static public configure(authProvider: AuthProviderConfiguration) {
        // 2 Hand off AuthProviderConfiguration to AuthManager
        manager.configure(for: authProvider)
    }

    // 3: Convenience getter for the single AuthSession
    static public var session: AuthSession? {
        return manager.authSession
    }
}