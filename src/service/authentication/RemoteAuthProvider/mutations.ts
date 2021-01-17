import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
mutation SignUpUser($input: SignUpInput!) {
    signUp(input: $input) {
        email
        phoneNumber
        userId
    }
}`

export const SIGN_IN_USER = gql`
mutation SignInUser($input: SignInInput!) {
    signIn(input: $input) {
        session
        success
    }
}`

export const RESPOND_TO_AUTH_CHALLENGE = gql`
mutation RespondToAuthChallenge($input: RespondToAuthChallengeInput!) {
    respondToAuthChallenge(input: $input) {
        userId
        accessToken
        userVerified
    }
}`

export const RESEND_CONFIRMATION_CODE = gql`
mutation ResendConfirmationCode($input: ResendConfirmationCodeInput!) {
    resendConfirmationCode(input: $input) {
        success
    }
}`

export const SIGN_OUT_USER = gql`
mutation SignOutUser($input: SignOutInput!) {
    signOut(input: $input) {
        success
    }
}`

export const CONFIRM_SIGN_UP = gql`
mutation ConfirmSignUp($input: ConfirmSignUpInput!) {
    confirmSignUp(input: $input) {
        success
    }
}`