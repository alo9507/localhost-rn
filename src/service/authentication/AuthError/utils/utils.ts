import AuthError from '../AuthError';

export const determineErrorType = (error: any): AuthError => {
  const errorMessage = error.message.match(/"([^']+)"/)[1];
  console.log(error);
  let parsedError;
  if (errorMessage.indexOf(':') !== -1) {
    parsedError = errorMessage.split(':')[0];
  }

  switch (parsedError) {
    case 'PasswordTooShort':
      return AuthError.passwordTooShort;
    case 'UserNotFound':
      return AuthError.userDoesNotExist;
    case 'UsernameInvalid':
      return AuthError.usernameInvalid;
    case 'UsernameCannotBeEmpty':
      return AuthError.usernameCannotBeEmpty;
    case 'UsernameAlreadyExists':
      return AuthError.usernameAlreadyExists;
    case 'InvalidVerificationCode':
      return AuthError.invalidVerificationCode;
    default:
      return AuthError.unknownError;
  }
};
