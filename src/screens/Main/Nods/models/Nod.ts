import User from "../../../../models/User"

export type Nod = {
    createdAt: number,
    latitude: number,
    longitude: number,
    message: string,
    initiator: boolean,
    seen: boolean
}

export type UserWithNods = {
    user: User
    nod: Nod
}