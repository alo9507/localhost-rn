import User from "../../models/User"
import { UpdateUserInput } from "./graphql/input"

interface UserRepository {
  getUser(id: string): Promise<User>
  createUser(id: string, phoneNumber: string): Promise<User>
  updateUser(input: UpdateUserInput): Promise<User>
  getUsers(): Promise<User[]>
  getIncomingNods(id: string): Promise<User[]>
  updateShowMeCriteria(input: UpdateUserInput): Promise<User>
  updateLocationGetUsers(input: UpdateUserInput): Promise<User[]>
  becomeVisibleTo(input: Object): Promise<Object>
  becomeInvisibleTo(input: Object): Promise<Object>
  unmatch(input: Object): Promise<Object>
  report(input: Object): Promise<Object>
  sendNod(input: Object): Promise<Object>
}

export default UserRepository
