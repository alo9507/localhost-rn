import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http"
import UserRepository from "../../service/user-repository/UserRepository"
import User from "../../models/User"
import { GET_USER, GET_USERS } from "./graphql/query"
import { CREATE_USER, UPDATE_USER, UPDATE_LOCATION_AND_GET_USERS, UPDATE_SHOWME_CRITERIA, SEND_NOD } from "./graphql/mutation"
import { UpdateUserInput, UpdateLocationGetUsers } from "./graphql/input"

const env = require("../../../env.json")

class GraphQLUserRepository implements UserRepository {
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

  httpLink = new HttpLink({ uri: `${env.API_URL}/api` })

  private client = new ApolloClient({
    uri: `${env.API_URL}/api`,
    cache: new InMemoryCache({
      addTypename: false
    }),
    link: ApolloLink.from([this.httpLink, this.errorLink])
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
    console.log(`${id}, ${email}`)
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
