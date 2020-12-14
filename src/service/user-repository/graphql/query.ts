import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetUser($id: ID!) {
    user(id: $id) {
      id
      sex
      name
      email
      bio
      whatAmIDoing
      isVisible
      age
      inbound {
        id
      }
      outbound {
        id
      }
      mutual {
        id
      }
      showMeCriteria {
        sex
        age
      }
    }
}
`;

export const GET_USERS = gql`
query GetUsers {
    users {
        id
        name
        sex
        age
        isVisible
        email
    }
}
`;

export const GET_INCOMING_NODS = gql`
query GetIncomingNods($id: ID!) {
    getIncomingNods(id: $id) {
        user {
          id
          sex
          name
          email
          bio
          whatAmIDoing
          isVisible
          age
          latitude
          longitude
        }
        nod {
          message
          seen
        }
    }
}
`;