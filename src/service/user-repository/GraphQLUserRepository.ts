import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http"
import UserRepository from "../../service/user-repository/UserRepository"
import User from "../../models/User"
import { GET_USER, GET_INCOMING_NODS, GET_USERS } from "./graphql/query"
import { CREATE_USER, UNMATCH, BECOME_INVISIBLE_TO, REPORT, UPDATE_USER, UPDATE_LOCATION_AND_GET_USERS, UPDATE_SHOWME_CRITERIA, SEND_NOD, BECOME_VISIBLE_TO } from "./graphql/mutation"
import { UpdateUserInput, UpdateLocationGetUsers } from "./graphql/input"
import { Platform } from "react-native"

const env = require("../../../env.json")

class GraphQLUserRepository implements UserRepository {
  constructor () { }

  userRepoApiUrl = Platform.OS === "android" ? env.ANDROID_API_URL : env.IOS_API_URL

  errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}, Response: ${JSON.stringify(response)}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  httpLink = new HttpLink({ uri: `${this.userRepoApiUrl}/api` })

  private client = new ApolloClient({
    uri: `${this.userRepoApiUrl}/api`,
    cache: new InMemoryCache({
      addTypename: false
    }),
    link: ApolloLink.from([this.errorLink, this.httpLink])
  });

  async getUser(id: string): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.query({
          query: GET_USER,
          variables: { id: id }
        });
        resolve(result.data.user)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  createUser(id: string, email: string): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: CREATE_USER,
          variables: { input: { id: id, email: email } },
        });
        resolve(result.data.createUser)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  sendNod(input: Object): Promise<Object> {
    let promise: Promise<Object> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: SEND_NOD,
          variables: { input },
        });
        resolve(result.data.sendNod)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  report(input: Object): Promise<Object> {
    let promise: Promise<Object> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: REPORT,
          variables: { input },
        });
        resolve(result.data.report)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  unmatch(input: Object): Promise<Object> {
    let promise: Promise<Object> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: UNMATCH,
          variables: { input },
        });
        resolve(result.data.report)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  becomeInvisibleTo(input: Object): Promise<Object> {
    let promise: Promise<Object> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: BECOME_INVISIBLE_TO,
          variables: { input },
        });
        resolve(result.data.report)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  becomeVisibleTo(input: Object): Promise<Object> {
    let promise: Promise<Object> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: BECOME_VISIBLE_TO,
          variables: { input },
        });
        resolve(result.data.report)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  updateUser(input: UpdateUserInput): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: UPDATE_USER,
          variables: { input },
        });
        resolve(result.data.updateUser)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }


  updateLocationGetUsers(input: UpdateUserInput): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: UPDATE_LOCATION_AND_GET_USERS,
          variables: { input },
        });
        resolve(result.data.updateLocationGetUsers)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  getIncomingNods(id: string): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.query({
          query: GET_INCOMING_NODS,
          variables: { id: id },
        });
        resolve(result.data.getIncomingNods)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  updateShowMeCriteria(input: UpdateUserInput): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.mutate({
          mutation: UPDATE_SHOWME_CRITERIA,
          variables: { input },
        });
        resolve(result.data.updateShowMeCriteria)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }

  getUsers(): Promise<User[]> {
    let promise: Promise<User[]> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.query({
          query: GET_USERS,
        });
        resolve(result.data.users)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }
}

export default GraphQLUserRepository
