import { gql } from "@apollo/client";

export const GET_USER = gql`
query GetUser($id: ID!) {
    user(id: $id) {
      id
      sex
      firstname
      lastname
      email
      bio
      whatAmIDoing
      isVisible
      age
      phoneNumber
      profileImageUrl
      hometown
      workExperience {
        organizationName
      }
      schools {
        name
      }
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
        firstname
        lastname
        sex
        age
        isVisible
        email
        profileImageUrl
    }
}
`;

export const GET_INCOMING_NODS = gql`
query GetIncomingNods($id: ID!) {
    getIncomingNods(id: $id) {
        user {
          id
          sex
          firstname
          lastname
          email
          bio
          whatAmIDoing
          isVisible
          age
          latitude
          longitude
          profileImageUrl
        }
        nod {
          message
          seen
          latitude
          longitude
        }
    }
}
`;