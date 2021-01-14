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
        userId
        accessToken
        userVerified
    }
}`

export const SIGN_OUT_USER = gql`
mutation SignOutUser($input: SignOutInput!) {
    signOut(input: $input) {
        success
    }
}`

export const CONFIRM_SIGN_UP = gql`
mutation ConfirmSignUp($input: ConfirmSignUp!) {
    confirmSignUp(input: $input) {
        success
    }
}`