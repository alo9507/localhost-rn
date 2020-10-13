enum AuthError {
    userNotFound = "UserNotFound",
    emailAlreadyExists = "EmailAlreadyExists",
    PasswordNotAllowed = "PasswordNotAllowed",
    passwordTooShort = "PasswordTooShort",
    usernameInvalid = "UsernameInvalid",
    unknownError = "UnknownError"
}

export default AuthError