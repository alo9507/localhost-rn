import AuthManager from "../service/authentication/AuthManager/AuthManager"
import UserRepository from "../service/user-repository/UserRepository"

type AppState = {
    userRepository: UserRepository;
    authManager: AuthManager;
};

export default AppState