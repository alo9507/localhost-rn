import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($id: ID!, $email: String!){
    createUser(input: { id: $id, email: $email } ) {
        id
        name
    }
}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      whatAmIDoing
      bio
      whatAmIDoing
      sex
      age
      isVisible
    }
  }
`;

export const SEND_NOD = gql`
mutation SendNod($input: SendNodInput!){
    sendNod(input: $input ) {
        from
        to
        location
        message
    }
}`

export const RETURN_NOD = gql`
mutation ReturnNod($input: SendNodInput!){
    returnNod(input: $input ) {
        from
        to
        location
        message
    }
}`