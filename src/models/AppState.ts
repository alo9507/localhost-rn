import AuthManager from '../service/authentication/AuthManager/AuthManager';
import FirstLaunchService from '../service/first-launch-service/FirstLaunchService';
import MediaUploadService from '../service/media-upload/MediaUploadService';
import UserRepository from '../service/user-repository/UserRepository';
import User from './User';

type AppState = {
  userRepository: UserRepository;
  authManager: AuthManager;
  mediaUploadService: MediaUploadService;
  firstLaunchService: FirstLaunchService;
  user: User;
};

export default AppState;
