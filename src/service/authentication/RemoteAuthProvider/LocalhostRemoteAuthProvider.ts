import AuthError from "../AuthError/AuthError";
import AuthSession from "../AuthSession/AuthSession";
import RemoteAuthProvider from "./RemoteAuthProvider"

import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http"

import { SIGN_IN_USER, SIGN_OUT_USER, SIGN_UP_USER } from "./mutations"

const env = require("../../../../env.json")

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {
  constructor () { }

  errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}, Response: ${JSON.stringify(response)}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  httpLink = new HttpLink({ uri: `${env.API_URL}/account` })

  private client = new ApolloClient({
    uri: `${env.API_URL}/account`,
    cache: new InMemoryCache({
      addTypename: false
    }),
    link: ApolloLink.from([this.httpLink, this.errorLink])
  });

  signIn(email: string, password: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: SIGN_IN_USER,
          variables: { input: { email: email, password: password } },
        });

        const authSession = result.data.signIn

        resolve(new AuthSession(authSession.userId, authSession.authToken));
      } catch (e) {
        switch (e.message) {
          case "Username should be either an email or a phone number.":
            reject(`${AuthError.usernameInvalid}:  ${e.message}`);
            break;
          case "Password did not conform with policy: Password not long enough":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
            break;
          case "User is not confirmed.":
            reject(`${AuthError.userIsNotConfirmed}:  ${e.message}`);
            break;
          case "Incorrect username or password.":
            reject(`${AuthError.incorrectUsernameOrPassword}:  ${e.message}`);
            break;
          case "User does not exist.":
            reject(`${AuthError.userDoesNotExist}:  ${e.message}`);
            break;
          default:
            reject(`${AuthError.unknownError}:  ${e.message}`);
        }
      }
    })
    return promise
  }

  signOut(): Promise<boolean> {
    let promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: SIGN_OUT_USER
        });
        resolve(result.data.signOut.success);
      } catch (error) {
        reject(`Error signing out: ${error}`);
      }
    })
    return promise
  }

  async signUp(email: string, password: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: SIGN_UP_USER,
          variables: { input: { email: email, password: password } },
        });

        const authSession = result.data.signUp
        console.log("in repo", authSession)

        resolve(new AuthSession(authSession.userId, authSession.authToken));
      } catch (e) {
        switch (e.message) {
          case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
          case "User does not exist.":
            reject(`${AuthError.userNotFound}:  ${e.message}`);
          case "Username should be either an email or a phone number.":
            reject(`${AuthError.usernameInvalid}:  ${e.message}`);
          case "Password did not conform with policy: Password not long enough":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
          case "An account with the given email already exists.":
            reject(`${AuthError.emailAlreadyExists}:  ${e.message}`);
          default:
            reject(`${AuthError.unknownError}:  ${e.message}`);
        }
      }
    })
    return promise
  }
}

export default AWSAmplifyRemoteAuthProvider;
