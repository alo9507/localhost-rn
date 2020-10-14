import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import AuthError from "../AuthError/AuthError";
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
      switch (e.message) {
        case "Username should be either an email or a phone number.":
          onFailure(`${AuthError.usernameInvalid}:  ${e.message}`);
        case "Password did not conform with policy: Password not long enough":
          onFailure(`${AuthError.passwordTooShort}:  ${e.message}`);
        case "User is not confirmed.":
          onFailure(`${AuthError.userIsNotConfirmed}:  ${e.message}`);
        case "Incorrect username or password.":
          onFailure(`${AuthError.incorrectUsernameOrPassword}:  ${e.message}`);
        default:
          onFailure(`${AuthError.unknownError}:  ${e.message}`);
      }
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

  async signUp(
    email: string,
    password: string,
    onSuccess: (authSession: AuthSession) => void,
    onFailure: (error: string) => void
  ) {
    try {
      const signUpResult = await Auth.signUp({
        username: email,
        password: password,
      });

      const userId = signUpResult.userSub;

      onSuccess(new AuthSession(userId, "fakeToken"));
    } catch (e) {
      switch (e.message) {
        case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
          onFailure(`${AuthError.passwordTooShort}:  ${e.message}`);
          break;
        case "User does not exist.":
          onFailure(`${AuthError.userNotFound}:  ${e.message}`);
          break;
        case "Username should be either an email or a phone number.":
          onFailure(`${AuthError.usernameInvalid}:  ${e.message}`);
          break;
        case "Password did not conform with policy: Password not long enough":
          onFailure(`${AuthError.passwordTooShort}:  ${e.message}`);
          break;
        case "An account with the given email already exists.":
          onFailure(`${AuthError.emailAlreadyExists}:  ${e.message}`);
          break;
        default:
          onFailure(`${AuthError.unknownError}:  ${e.message}`);
          break;
      }
    }
  }
}

export default AWSAmplifyRemoteAuthProvider;
