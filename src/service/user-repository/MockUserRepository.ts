import User from "../../models/User";
import { UpdateUserInput } from "./graphql/input";
import UserRepository from "./UserRepository"

class MockUserRepository implements UserRepository {
    constructor () { }
    getUser(id: string): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = new User("id", 11, "myemail@g.com", "male", "Andrew", "bio", "chilling", "sdf", true)
            resolve(mockUser)
        })
        return promise
    }
    createUser(id: string, email: string): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = new User("id", 11, "myemail@g.com", "male", "Andrew", "bio", "chilling", "sdf", true)
            resolve(mockUser)
        })
        return promise
    }
    updateUser(input: UpdateUserInput): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = new User("id", 11, "myemail@g.com", "male", "Andrew", "bio", "chilling", "sdf", true)
            resolve(mockUser)
        })
        return promise
    }
    getUsers(): Promise<User[]> {
        let promise: Promise<User[]> = new Promise((resolve, reject) => {
            let mockUser = new User("id", 11, "myemail@g.com", "male", "Andrew", "bio", "chilling", "sdf", true)
            resolve([mockUser])
        })
        return promise
    }
}

export default MockUserRepository