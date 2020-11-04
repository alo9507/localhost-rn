class AuthProviderConfiguration {
    authProviderConfig = AuthProviderConfiguration.awsAmplify
    static remoteAuthProvider = () => {
        switch (this.authProviderConfig) {
            case AuthProviderConfiguration.awsAmplify:
                return new AWSAmplifyRemoteAuthProvider()
        }
    }
}

enum AuthProviderConfiguration {
    awsAmplify = "awsAmplify"
}