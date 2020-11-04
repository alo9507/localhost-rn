import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        sex
        age
        isVisible
        email
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