import User from "../../models/User"

interface UserRepository {
  getUser(id: string): Promise<User>
  createUser(id: string, email: string): Promise<User>
}

export default UserRepository
