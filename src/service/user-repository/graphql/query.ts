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
        title
        startYear
        endYear
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
        sex
        firstname
        lastname
        email
        bio
        whatAmIDoing
        isVisible
        phoneNumber
        age
        profileImageUrl
        workExperience {
            organizationName
            title
            startYear
            endYear
        }
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
          phoneNumber
          age
          profileImageUrl
          workExperience {
              organizationName
              title
              startYear
              endYear
          }
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