export type UpdateUserInput = {
    id: String,
    email: String | null,
    name: String | null,
    bio: String | null,
    whatAmIDoing: String | null,
    isVisible: Boolean | null,
    sex: String | null,
    age: number | null,
    latitude: number | null,
    longitude: number | null,
}

export type UpdateLocationGetUsers = {
    id: String,
    latitude: number
    longitude: number
}