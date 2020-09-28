import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import AuthSession from "../AuthSession/AuthSession";

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {
  async signIn(
    email: string,
    password: string,
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ) {
    try {
      const signInResult = await Auth.signIn({
        username: email,
        password: password,
      });

      const userId = signInResult.attributes.sub;

      onSuccess(new AuthSession(userId, "fakeToken"));
    } catch (e) {
      onFailure(e);
    }
  }

  async signOut(
    onSuccess: (success: boolean) => void,
    onFailure: (error: string) => void
  ) {
    try {
      await Auth.signOut();
      onSuccess(true);
    } catch (error) {
      onFailure(`Error signing out: ${error}`);
    }
  }
}

export default AWSAmplifyRemoteAuthProvider;
