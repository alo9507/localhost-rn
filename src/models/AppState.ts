import AuthManager from "../service/authentication/AuthManager/AuthManager"
import UserRepository from "../service/user-repository/UserRepository"
import User from "./User";

type AppState = {
    userRepository: UserRepository;
    authManager: AuthManager;
    user: User;
};

export default AppState