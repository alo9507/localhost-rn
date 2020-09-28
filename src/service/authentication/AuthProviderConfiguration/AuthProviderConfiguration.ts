class AuthProviderConfiguration {
    var remoteAuthProvider: RemoteAuthProvider {
        switch self {
        case .awsAmplify:
          return new AWSAmplifyRemoteAuthProvider()
    }
}

enum AuthProviderConfiguration {
    awsAmplify="awsAmplify"
}