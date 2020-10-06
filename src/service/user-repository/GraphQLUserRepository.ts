import { useQuery, gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

class GraphQLUserRepository implements UserRepository {
  client = new ApolloClient({
    uri: "https://silly-bell-fb236d.netlify.app/.netlify/functions/graphql",
    cache: new InMemoryCache(),
  });

  getUser(id: string) {
    this.client
      .query({
        query: GET_USER,
      })
      .then((result) => console.log(result));
  }

  createUser() {
    CREATE_USER = gql`
      mutation {
        createUser(
          id: "newId"
          name: "Andrew"
          bio: "a lil about me"
          whatAmIDoing: "fdsfsd"
          location: "fsdf"
          isVisible: true
          age: 24
          sex: "male"
        ) {
          id
          name
        }
      }
    `;

    this.client.mutate();
  }
}
