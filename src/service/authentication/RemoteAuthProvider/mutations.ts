import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
mutation SignUpUser($input: SignUpUserInput!) {
    signUp(input: $input) {
        email
        password
        authToken
        userId
    }
}`

export const SIGN_IN_USER = gql`
mutation SignInUser($input: SignInUserInput!) {
    signIn(input: $input) {
        email
        password
        authToken
        userId
    }
}`

export const SIGN_OUT_USER = gql`
mutation SignOutUser($input: SignOutUserInput!) {
    signOut(input: $input) {
        success
    }
}`