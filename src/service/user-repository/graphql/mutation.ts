import { gql } from "@apollo/client";

export const CREATE_USER = gql`
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