import User from "../../models/User"
import { UpdateUserInput } from "./graphql/input"

interface UserRepository {
  getUser(id: string): Promise<User>
  createUser(id: string, email: string): Promise<User>
  updateUser(input: UpdateUserInput): Promise<User>
  getUsers(): Promise<User[]>
}

export default UserRepository
