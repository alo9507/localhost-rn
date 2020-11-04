import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import UserRepository from "../../service/user-repository/UserRepository"
import User from "../../models/User"
import { GET_USER } from "./graphql/query"
import { CREATE_USER } from "./graphql/mutation"

class GraphQLUserRepository implements UserRepository {
  client = new ApolloClient({
    uri: "https://silly-bell-fb236d.netlify.app/.netlify/functions/graphql",
    cache: new InMemoryCache(),
  });

  async getUser(id: string): Promise<User> {
    let promise: Promise<User> = new Promise(async (resolve, reject) => {
      try {
        const result = await this.client.query({
          query: GET_USER,
          variables: { id: id }
        });
        resolve(result.data)
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
        resolve(result.data)
      } catch (e) {
        reject(e)
      }
    })
    return promise
  }
}
