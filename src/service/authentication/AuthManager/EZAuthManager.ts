import AWSAmplifyRemoteAuthProvider from "../RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import AsyncStorageAuthDataStore from "../AuthDataStore/AsyncStorageAuthDataStore";

class EZAuthManager implements AuthManager {
  authSession: AuthSession;
  authDataStore: AuthDataStore;
  remoteAuthProvider: RemoteAuthProvider;

  constructor() {
    this.authDataStore = new AsyncStorageAuthDataStore();
    this.remoteAuthProvider = new AWSAmplifyRemoteAuthProvider();
    this.authSession = null;
  }

  async signIn(
    email: string,
    password: string,
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ) {
    this.remoteAuthProvider.signIn(
      email,
      password,
      (authSession) => {
        this.authDataStore.save(
          authSession,
          async (authSession) => {
            console.log("about to set auth session");
            this.authSession = authSession;
            onSuccess(authSession);
          },

          async (error) => {
            onFailure(error);
          }
        );
      },
      (error) => {
        onFailure(error);
      }
    );
  }

  async signOut(
    onSuccess: (success: boolean) => void,
    onFailure: (error: string) => void
  ): void {
    this.remoteAuthProvider.signOut(
      (success) => {
        this.authDataStore.delete(
          (success) => {
            onSuccess(success);
          },
          (error) => {
            onFailure(error);
          }
        );
      },
      (error) => {
        onFailure(`Error signing out: ${error}`);
      }
    );
  }

  async checkForAuthSession(
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: String) => void
  ) {
    const authSession = this.authDataStore.readAuthSession(
      (authSession) => {
        onSuccess(authSession);
      },
      (error) => {
        onFailure(error);
      }
    );
  }
}

export default EZAuthManager;
