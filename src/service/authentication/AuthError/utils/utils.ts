import AuthError from "../AuthError"

export const determineErrorType = (error) => {
    let errorMessage = error.message.match(/"([^']+)"/)[1];

    let parsedError;
    if (errorMessage.indexOf(':') !== -1) {
        parsedError = errorMessage.split(':')[0];
    }

    switch (parsedError) {
        case "PasswordTooShort":
            return AuthError.passwordTooShort;
        case "UserNotFound":
            return AuthError.userDoesNotExist;
        case "UsernameInvalid":
            return AuthError.usernameInvalid;
        case "PasswordTooShort":
            return AuthError.passwordTooShort;
        case "UsernameCannotBeEmpty":
            return AuthError.usernameCannotBeEmpty;
        case "PasswordTooShort":
            return AuthError.passwordTooShort;
        case "UserNotFound":
            return AuthError.userDoesNotExist;
        case "UsernameInvalid":
            return AuthError.usernameInvalid;
        case "PasswordTooShort":
            return AuthError.passwordTooShort;
        case "UsernameAlreadyExists":
            return AuthError.usernameAlreadyExists;
        case "UsernameCannotBeEmpty":
            return AuthError.usernameCannotBeEmpty;
        case "UsernameAlreadyExists":
            return AuthError.usernameAlreadyExists;
        case "InvalidVerificationCode":
            return AuthError.invalidVerificationCode;
        default:
            return AuthError.unknownError;
    }
}