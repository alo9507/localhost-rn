enum AuthError {
    userNotFound = 'UserNotFound',
    emailAlreadyExists = "The email you entered already exists in localhost",
    PasswordNotAllowed = "The password you entered is invalid.",
    passwordTooShort = "Password too short. Must be 8 characters",
    usernameInvalid = "Username must be a valid email of phone number",
    unknownError = "UnknownError",
    userIsNotConfirmed = "The user is not confirmed",
    incorrectUsernameOrPassword = "Incorrect username or password",
    userDoesNotExist = "The user you entered does not exist",
    notAuthneticated = "NotAuthenticated",
    usernameCannotBeEmpty = 'Please enter an email or a phone number.'
}

export default AuthError