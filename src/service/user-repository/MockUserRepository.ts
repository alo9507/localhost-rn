import User from "../../models/User";
import { UpdateUserInput } from "./graphql/input";
import UserRepository from "./UserRepository"
import users from "./mockUsers"
import incomingNods from "./incomingNods"

class MockUserRepository implements UserRepository {
    constructor () { }

    showMeCriteria = { sex: ["male", "female"], age: [0, 100] }
    user = new User("id", 11, "myemail@g.com", "male", "Andrew", "OBreezy", "bio", "chilling", "sdf", true, 10.0, 10.0, "profileimage", this.showMeCriteria)

    getUser(id: string): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = this.user
            resolve(mockUser)
        })
        return promise
    }

    createUser(id: string, email: string): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = this.user
            resolve(mockUser)
        })
        return promise
    }

    updateUser(input: UpdateUserInput): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            let mockUser = this.user
            resolve(mockUser)
        })
        return promise
    }

    getUsers(): Promise<User[]> {
        let promise: Promise<User[]> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    getIncomingNods(id: string): Promise<User[]> {
        let promise: Promise<User[]> = new Promise((resolve, reject) => {
            resolve(incomingNods)
        })
        return promise
    }

    updateShowMeCriteria(input: UpdateUserInput): Promise<User> {
        let promise: Promise<User> = new Promise((resolve, reject) => {
            resolve(this.user)
        })
        return promise
    }

    updateLocationGetUsers(input: UpdateUserInput): Promise<User[]> {
        let promise: Promise<User[]> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    becomeVisibleTo(input: Object): Promise<Object> {
        let promise: Promise<Object> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    becomeInvisibleTo(input: Object): Promise<Object> {
        let promise: Promise<Object> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    unmatch(input: Object): Promise<Object> {
        let promise: Promise<Object> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    report(input: Object): Promise<Object> {
        let promise: Promise<Object> = new Promise((resolve, reject) => {
            resolve(users)
        })
        return promise
    }

    sendNod(input: Object): Promise<Object> {
        let promise: Promise<Object> = new Promise((resolve, reject) => {
            resolve({})
        })
        return promise
    }

}

export default MockUserRepository