import AuthSession from '../AuthSession/AuthSession';
import AuthDataStore from '../AuthDataStore/AuthDataStore';

interface AuthManager {
  authSession: AuthSession | null;
  authDataStore: AuthDataStore;

  signUp(email: string, password: string): Promise<AuthSession>;
  confirmSignUp(username: string, code: string): Promise<AuthSession>;
  resendConfirmationCode(username: string): Promise<boolean>;
  respondToAuthChallenge(username: string, code: string, session: string): Promise<AuthSession>;
  signIn(email: string, password: string): Promise<AuthSession>;
  signOut(accessToken: string): Promise<boolean>;
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  forgotPassword(username: string): Promise<boolean>;
  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean>;
  checkForAuthSession(): Promise<AuthSession | null>;
}

export default AuthManager;
