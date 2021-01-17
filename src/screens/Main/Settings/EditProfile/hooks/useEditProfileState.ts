import { useContext } from 'react';
import StoreContext from '../../../../../store/StoreContext';
import EditProfileContext from '../store/EditProfileContext';
import useCurrentUser from '../../../../../hooks/useCurrentUser';
import User from '../../../../../models/User';

const useEditProfileState = (): [User, (payload) => void, () => void] => {
  const [appState] = useContext(StoreContext);
  const [editProfileState, setEditProfileState] = useContext(EditProfileContext);

  const [, updateCurrentUser] = useCurrentUser();

  const updateEditProfileState = (payload) => {
    setEditProfileState({ type: 'UPDATE_USER_PATCH', payload });
  };

  const submit = async () => {
    const result = await appState.userRepository.updateUser(editProfileState);
    updateCurrentUser(result);
  };

  return [editProfileState, updateEditProfileState, submit];
};

export default useEditProfileState;
