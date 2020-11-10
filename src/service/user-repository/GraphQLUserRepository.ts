import { ApolloClient, InMemoryCache } from "@apollo/client";
import UserRepository from "../../service/user-repository/UserRepository"
import User from "../../models/User"
import { GET_USER, GET_USERS } from "./graphql/query"
import { CREATE_USER, UPDATE_USER } from "./graphql/mutation"
import { UpdateUserInput } from "./graphql/input"
const env = require("../../../env.json")

class GraphQLUserRepository implements UserRepository {
  constructor () { }

  private client = new ApolloClient({
    uri: env.API_URL,
    cache: new InMemoryCache({
      addTypename: false
    }),
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
          variables: { id: id, email: email },
        });
        resolve(result.data.createUser)
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
