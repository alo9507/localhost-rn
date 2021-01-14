import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        sex
        firstname
        lastname
        phoneNumber
        email
        bio
        whatAmIDoing
        isVisible
        age
        isVisible
        profileImageUrl
        showMeCriteria {
            sex
            age
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
    }
}`

export const UPDATE_USER = gql`
mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input ) {
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
}`

export const SEND_NOD = gql`
mutation SendNod($input: SendNodInput!) {
    sendNod(input: $input ) {
        from
        to
        latitude
        longitude
        message
    }
}`

export const RETURN_NOD = gql`
mutation ReturnNod($input: SendNodInput!) {
    returnNod(input: $input ) {
        from
        to
        latitude
        longitude
        message
    }
}`

export const NOD_SEEN = gql`
mutation NOD_SEEN($input: NodSeenInput!) {
    nodSeen(input: $input ) {
        recipient
        sender
    }
}`

export const REPORT = gql`
mutation ReportUser($input: ReportInput!) {
    report(input: $input) {
        from
        to
        reason
        message
    }
}`

export const UNMATCH = gql`
mutation UnmatchUser($input: UnmatchInput!) {
    unmatch(input: $input) {
        from
        to
        reason
        message
    }
}`

export const BECOME_INVISIBLE_TO = gql`
mutation BecomeInvisibleTo($input: BecomeInvisibleToInput!) {
    becomeInvisibleTo(input: $input) {
        from
        to
    }
}`

export const BECOME_VISIBLE_TO = gql`
mutation BecomeInvisibleTo($input: BecomeVisibleToInput!) {
    becomeVisibleTo(input: $input) {
        from
        to
    }
}`

export const UPDATE_SHOWME_CRITERIA = gql`
mutation UpdateShowMeCriteria($input: UpdateShowMeCriteriaInput!) {
    updateShowMeCriteria(input: $input) {
        sex
        age
    }
}`

export const UPDATE_LOCATION_AND_GET_USERS = gql`
mutation UpdateLocationAndGetUsers($input: UpdateLocationInput!) {
    updateLocationGetUsers(input: $input) {
        id
        firstname
        lastname
        bio
        whatAmIDoing
        sex
        age
        latitude
        longitude
        profileImageUrl
    }
}`;