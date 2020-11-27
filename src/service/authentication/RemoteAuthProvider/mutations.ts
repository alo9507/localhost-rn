import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
mutation SignUpUser($input: SignUpInput!) {
    signUp(input: $input) {
        email
        password
        authToken
        userId
    }
}`

export const SIGN_IN_USER = gql`
mutation SignInUser($input: SignInInput!) {
    signIn(input: $input) {
        email
        password
        authToken
        userId
    }
}`

export const SIGN_OUT_USER = gql`
mutation SignOutUser($input: SignOutInput!) {
    signOut(input: $input) {
        success
    }
}`