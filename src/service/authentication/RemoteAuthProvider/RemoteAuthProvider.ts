import AuthSession from "../AuthSession/AuthSession"

interface RemoteAuthProvider {
  signIn(email: string, password: string): Promise<AuthSession>
  signOut(accessToken: string): Promise<boolean>
  signUp(phoneNumber: string): Promise<AuthSession>
  resendConfirmationCode(username: string): Promise<boolean>
  respondToAuthChallenge(username: string, code: string, session: string): Promise<AuthSession>
  confirmSignUp(username: string, code: string): Promise<AuthSession>
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>
  forgotPassword(username: string): Promise<boolean>
  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean>
}

export default RemoteAuthProvider
